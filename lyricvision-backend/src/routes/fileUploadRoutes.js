const express = require('express');
const multer = require('multer');
const FileUploadController = require('../controllers/fileUploadController');

const router = express.Router();
const fileUploadController = new FileUploadController();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Define routes for file uploads
router.post('/upload/audio', upload.single('audio'), fileUploadController.uploadAudio);
router.post('/upload/lyrics', upload.single('lyrics'), fileUploadController.uploadLyrics);

module.exports = router;