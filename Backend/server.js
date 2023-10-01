import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';
import notificationRouter from './routes/notificationRouter.js';
import uploadRouter from './routes/uploadRouter.js';
// import { User } from './models/userModel.js';
// import { faker } from '@faker-js/faker';
// import { Post } from './models/postModel.js';

const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongodbUrl)
    .then(() => console.log("database connected successfuly"))
    .catch(error => console.log(error.reason))

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/uploads', uploadRouter);
app.use('/uploads', express.static('./uploads'));

app.listen(config.PORT, () => console.log(`Server started at http://localhost:${config.PORT}`));