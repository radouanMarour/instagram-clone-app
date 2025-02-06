import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { User } from './models/userModel.js';
import { Post } from './models/postModel.js';
import config from './config.js';

const mongodbUrl = config.MONGODB_URI;
if (!mongodbUrl) {
    console.error('MongoDB URI is not defined in config!');
    process.exit(1);
}

const seedDatabase = async () => {

    try {
        // Modified connection handling
        await mongoose.connect(mongodbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
            socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
        });
        console.log("Database connected successfully");

        // Clear existing data
        console.log("Clearing existing data...");
        await Promise.all([
            User.deleteMany(),
            Post.deleteMany()
        ]);
        console.log("Cleared existing data");

        const users = [];
        // Create 20 users
        for (let i = 0; i < 20; i++) {
            const user = await new User({
                email: faker.internet.email(),
                fullName: faker.person.fullName(),
                userName: faker.internet.userName(),
                password: "12345678",
                bio: faker.lorem.paragraph(),
                profilePicture: `https://i.pravatar.cc/150?img=${i + 1}`,
            }).save();
            users.push(user);
        }

        // Create posts and relationships
        for (const user of users) {
            // Create 1-5 posts per user
            const postCount = Math.floor(Math.random() * 5) + 1;
            for (let j = 0; j < postCount; j++) {
                const post = await new Post({
                    user: user._id,
                    caption: faker.lorem.paragraph(),
                    image: `https://picsum.photos/800/800?random=${Math.random()}`,
                    likes: users.slice(0, Math.floor(Math.random() * users.length))
                        .map(u => u._id),
                    comments: Array.from({ length: Math.floor(Math.random() * 5) }, () => ({
                        user: users[Math.floor(Math.random() * users.length)]._id,
                        text: faker.lorem.sentence(),
                        createdAt: faker.date.past()
                    }))
                }).save();

                await User.findByIdAndUpdate(user._id, {
                    $push: { posts: post._id }
                });
            }

            // Add random followers/following
            const followersCount = Math.floor(Math.random() * 10);
            const randomFollowers = users
                .filter(u => u._id !== user._id)
                .sort(() => Math.random() - 0.5)
                .slice(0, followersCount);

            await User.findByIdAndUpdate(user._id, {
                $push: {
                    followers: { $each: randomFollowers.map(u => u._id) },
                    following: { $each: randomFollowers.map(u => u._id) }
                }
            });
        }

        console.log("Seeding completed successfully");
    } catch (error) {
        console.error(`Seeding failed: ${error.message}`);
    } finally {
        try {
            await mongoose.disconnect();
            console.log("Database connection closed");
        } catch (error) {
            console.error("Error while disconnecting:", error.message);
        }
    }
}

// Run the seeding function
seedDatabase();