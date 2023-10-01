import express from 'express';
import { Post } from '../models/postModel.js';
import { User } from '../models/userModel.js';
import { Notification } from '../models/notificationModel.js';
import { isAuth } from '../utils.js';
import { validatePost } from '../models/postModel.js';
import mongoose from 'mongoose';

const router = express.Router();

//CREATE A NEW POST
router.post('/', isAuth, async (req, res) => {
    const { error, value } = validatePost(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const post = await new Post({ ...value, user: req.user._id }).save();
        await User.findByIdAndUpdate(req.user._id, {
            $push: { posts: post._id }
        }, { new: true })
        res.status(200).json({
            post
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal server error" });
    }
})

//EDIT POST BY ID
router.put('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid post ID" });
    }
    const { error, value } = validatePost(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const post = await Post.findOneAndUpdate({ _id: req.params.id }, value, { new: true });
        res.status(200).json({
            post
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal server error" });
    }
})

//DELETE POST BY ID
router.delete('/:id', isAuth, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid post ID" });
    }
    try {
        const post = await Post.findOneAndDelete({ _id: req.params.id });
        res.status(200).json({
            post
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal server error" });
    }
})

//GET ALL POSTS
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({})
            .populate('user', 'profilePhoto userName fullName followers')
            .sort({ createdAt: 1 });
        if (!posts) {
            res.status(400).json({ error: "No posts found" })
        }
        return res.status(200).json({ posts })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})

// GET POST BY ID
router.get('/:id', async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: "Invalid post ID" });
        }
        const post = await Post.findById(req.params.id)
            .populate('user', 'userName fullName profilePhoto followers')
            .populate('comments.user', 'userName profilePhoto');
        if (!post) {
            console.log(post)
            return res.status(404).json({ error: "No post found" })
        }
        res.status(200).json({ post })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})

//LIKE OR UNLIKE A POST
router.put('/:id/like', isAuth, async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ error: "Invalid post ID" });
        }
        const postToLike = await Post.findById(req.params.id);
        const loggedInUserId = req.user._id;
        let message = "";
        if (postToLike.likes.includes(loggedInUserId)) {
            postToLike.likes.pull(loggedInUserId);
            message = `You unliked the post with id: ${req.params.id}`;
            await new Notification({
                sender: loggedInUserId,
                reciever: postToLike.user,
                content: `${req.user.userName} unliked your post`
            }).save();
        } else {
            postToLike.likes.push(loggedInUserId)
            message = `You liked the post with id: ${req.params.id}`;
            await new Notification({
                sender: loggedInUserId,
                reciever: postToLike.user,
                content: `${req.user.userName} liked your post`
            }).save();
        }
        await postToLike.save();
        res.status(200).json({ message: message })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})

//COMMENT ON A POST
router.post('/:id/comment', isAuth, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid post ID" });
    }

    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $push: { comments: { ...req.body, user: req.user._id } }
        }, { new: true })

        await new Notification({
            sender: req.user._id,
            reciever: post.user,
            content: `${req.user.userName} commented on your post width ID: ${post._id}`
        }).save();

        res.status(200).json({ message: `Commented successfully on post with id: ${req.params.id}` })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})

//SAVE OR UNSAVE POST
router.post('/:id/save', isAuth, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid post ID" });
    }

    try {
        const user = await User.findById(req.user._id);
        const isSaved = user.saved.includes(req.params.id)
        if (isSaved) {
            user.saved.pull(req.params.id);
            await user.save();

            res.status(200).json({
                user,
                message: `Post unsaved successfully`
            })
        } else {
            user.saved.push(req.params.id);
            await user.save();

            res.status(200).json({
                user,
                message: `Post saved successfully`
            })
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})

export default router;