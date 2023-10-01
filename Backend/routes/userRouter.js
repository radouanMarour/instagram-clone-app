import express from 'express';
import { User } from '../models/userModel.js';
import { isAuth } from '../utils.js';
import mongoose from 'mongoose';
import { Notification } from '../models/notificationModel.js';

const router = express.Router();

//GET ALL USERS
router.get('/', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json({ users })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})

//SEARCH USERS BASED ON QUERY
router.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const users = await User.find({ userName: { $regex: query } })
            .select({ profilePhoto: 1, fullName: 1, userName: 1, followers: 1, following: 1 });
        res.status(200).json({ users });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" });
    }
})

//GET USER BY ID OR USERNAME
router.get('/:param', async (req, res) => {
    if (mongoose.isValidObjectId(req.params.param)) {
        try {
            const id = req.params.param;
            const user = await User.findOne({ _id: id });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.status(200).json({ user });
            }
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    } else {
        const username = req.params.param;
        try {
            const user = await User.findOne({ userName: username });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.status(200).json({ user });
            }
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }


})

//EDIT CURRENTLY LOGGED IN USER
router.put('/me', isAuth, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})

//FOLLOW OR UNFOLLOW A USER
router.put('/:id/follow', isAuth, async (req, res) => {
    const userToFollowId = req.params.id;
    const loggedInUserId = req.user._id;
    let message = "";
    try {
        const userToFollow = await User.findOne({ _id: userToFollowId });
        const loggedInUser = await User.findOne({ _id: loggedInUserId });
        if (userToFollow.followers.includes(loggedInUserId)) {
            userToFollow.followers.pull(loggedInUserId);
            loggedInUser.following.pull(userToFollowId);
            message = `You have unfollowed ${userToFollow.fullName}`;
            await new Notification({
                sender: loggedInUserId,
                reciever: userToFollowId,
                content: `${req.user.userName} is no longer following you`
            }).save();
        } else {
            userToFollow.followers.push(loggedInUserId);
            loggedInUser.following.push(userToFollowId);
            message = `You are now following ${userToFollow.fullName}`;
            await new Notification({
                sender: loggedInUserId,
                reciever: userToFollowId,
                content: `${req.user.userName} start following you`
            }).save();
        }
        await userToFollow.save();
        await loggedInUser.save();
        res.status(200).json({ message: message })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" });
    }
})


export default router;
