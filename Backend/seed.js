import express from 'express';
import { faker } from '@faker-js/faker';
import { User } from './models/userModel.js';
import { Post } from './models/postModel.js';
const app = express();

app.post('/api/seed', async (req, res) => {
    await User.deleteMany({})
    await Post.deleteMany({})
    for (let i = 0; i < 10; i++) {
        const user = await new User({
            email: faker.internet.email(),
            fullName: faker.person.fullName(),
            userName: faker.person.lastName(),
            password: "12345678",
            bio: faker.lorem.lines(2)
        }).save();

        for (let j = 0; j < 3; j++) {
            const post = await new Post({
                user: user._id,
                caption: faker.lorem.lines(2),
                image: "e8a5dc70-2ede-4404-b6b9-732b4fcac2cc.png",
            }).save();
            await User.findByIdAndUpdate(user._id, {
                $push: { posts: post._id }
            }, { new: true });
        }

        if (i === 7) {
            return res.send("Seeding completed successfully");
        }
    }
})