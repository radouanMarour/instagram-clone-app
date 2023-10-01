import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import Joi from 'joi';
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, unique: true, required: true, minLength: 10, maxLength: 255 },
    profilePhoto: { type: String, default: "" },
    password: { type: String, minLength: 8, maxLength: 255 },
    bio: { type: String, maxLength: 255, default: "" },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    saved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    notifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
},
    {
        toJSON: { virtuals: true }, // Include virtual properties in JSON output
        toObject: { virtuals: true }, // Include virtual properties in object output
    }
);

userSchema.index({ userName: 'text' });

userSchema.virtual('followersCount').get(function () {
    if (this.followers) {
        return this.followers.length;
    }
})
userSchema.virtual('followingCount').get(function () {
    if (this.following) {
        return this.following.length;
    }
})

userSchema.pre('save', function (next) {
    if (this.password) {
        bcrypt.hash(this.password, 10, (err, hash) => {
            if (err) {
                return next(err);
            }
            this.password = hash;
            next();
        })
    } else {
        next();
    }

})

export const validateUser = (user) => {
    const schema = Joi.object({
        fullName: Joi.string().required(),
        userName: Joi.string().required(),
        email: Joi.string().email().min(10).max(255).required(),
        profilePhoto: Joi.string().default(""),
        password: Joi.string().min(8).max(255),
        bio: Joi.string().max(255).default(""),
        posts: Joi.array().default([]),
        saved: Joi.array().default([]),
        followers: Joi.array().default([]),
        following: Joi.array().default([]),
    })
    return schema.validate(user);
}

export const User = mongoose.model('User', userSchema);
