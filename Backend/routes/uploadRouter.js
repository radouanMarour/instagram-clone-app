import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname))
    }

})

const upload = multer({ storage });

const router = express.Router();

router.post('/', upload.single('photo'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        return res.status(201).json({ message: 'File uploaded successfully.', photo: req.file.filename });
    } catch (error) {
        res.status(500).json('Internal server error');
    }
})

export default router;