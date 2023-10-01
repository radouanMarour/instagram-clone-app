import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/instagram-clone',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
};