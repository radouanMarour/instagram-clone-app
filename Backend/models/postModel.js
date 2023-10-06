import mongoose from "mongoose";
import Joi from 'joi';
const { Schema } = mongoose;

const postSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    caption: {
        type: String,
        maxLenght: 2200
    },
    image: {
        type: String,
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            text: {
                type: String,
                maxLenght: 500,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
},
    {
        timestamps: true,
        toJSON: { virtuals: true }, // Include virtual properties in JSON output
        toObject: { virtuals: true }, // Include virtual properties in object output
    }
);

postSchema.virtual('commentCount').get(function () {
    return this.comments.length;
})

export const validatePost = (post) => {
    const schema = Joi.object({
        user: Joi.string(),
        caption: Joi.string().max(2200),
        image: Joi.string().required(),
        likes: Joi.array().default([]),
        comments: Joi.array().default([]),
    })
    return schema.validate(post);
}

export const Post = mongoose.model('Post', postSchema);
