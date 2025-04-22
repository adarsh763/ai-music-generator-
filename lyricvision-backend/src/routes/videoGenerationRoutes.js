const express = require('express');
const VideoGenerationController = require('../controllers/videoGenerationController');

const router = express.Router();
const videoGenerationController = new VideoGenerationController();

// Route to generate a video
router.post('/generate', videoGenerationController.generateVideo);

// Route to retrieve a generated video
router.get('/:videoId', videoGenerationController.getVideo);

module.exports = router;