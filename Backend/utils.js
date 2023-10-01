import jwt from 'jsonwebtoken';
import config from './config.js';

export const generateToken = (user) => {
    return jwt.sign(
        { user: user },
        config.JWT_SECRET,
        { expiresIn: '48h' }
    )
}

export const isAuth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
        jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({ 'message': 'Invalid token' });
            } else {
                req.user = decoded.user;
                next();
            }
        })
    } else {
        res.status(401).send({ 'message': 'Token is not supplied' });
    }
}

export const paramCheckMiddleware = (req, res, next) => {
    const { param } = req.params;

    // Check if the parameter matches the format of a MongoDB ObjectId
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(param);

    // Based on the result, set a flag in the request object
    req.isObjectId = isObjectId;
    next();
};