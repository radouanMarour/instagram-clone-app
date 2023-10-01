import express from 'express';
import { Notification } from '../models/notificationModel.js';
import { isAuth } from '../utils.js';
import mongoose from 'mongoose';
const router = express.Router();

//GET NOTIFICATIONS BY USER
router.get('/:userId', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.userId)) {
        return res.status(400).json({ error: "Invalid post ID" });
    }
    try {
        const notifications = await Notification.find({ reciever: req.params.userId })
            .populate('sender', 'userName profilePhoto')
            .populate('reciever', 'followers');
        res.status(200).json({
            notifications
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Internal server error" });
    }
})

//MARK NOTIFICATION AS READED
router.put('/:id/read', isAuth, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid post ID" });
    }

    try {
        await Notification.findByIdAndUpdate(req.params.id, {
            $set: { "isRead": true }
        }, { new: true })
        res.status(200).json({ message: `notification with id: ${req.params.id} set as read` })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})

export default router;