import express from 'express';
import bcrypt from 'bcrypt';
import { validateUser, User } from '../models/userModel.js';
import { generateToken } from '../utils.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { value, error } = validateUser(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        let user = await User.findOne({ email: value.email });
        if (user) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        user = new User(value);
        await user.save();

        res.status(200).json({
            user: {
                id: user._id,
                fullName: user.fullName,
                userName: user.userName,
                email: user.email,
                profilePhoto: user.profilePhoto,
                posts: user.posts,
                followers: user.followers,
                following: user.following,
            },
            token: generateToken(user)
        })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/login', async (req, res) => {
    const body = req.body;
    // console.log(req.body);

    try {
        const user = await User.findOne({ email: body.email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email/password' });
        }
        const providedPassword = body.password;
        const hashedPassword = user.password;

        const passwordMatches = bcrypt.compare(providedPassword, hashedPassword);
        if (passwordMatches) {
            res.status(200).json({
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    userName: user.userName,
                    email: user.email,
                    profilePhoto: user.profilePhoto,
                    posts: user.posts,
                    saved: user.saved,
                    followers: user.followers,
                    following: user.following,
                },
                token: generateToken(user)
            })
        } else {
            return res.status(400).json({ error: 'Invalid email/password' });
        }
    } catch (error) {
        // console.log(error)
        res.status(500).json({ error: "Internal server error" });
    }
})

export default router;