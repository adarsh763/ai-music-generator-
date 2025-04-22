const express = require('express');
const AiController = require('../controllers/aiController');

const router = express.Router();
const aiController = new AiController();

router.post('/mood-analysis', aiController.analyzeMood);
router.post('/speech-detection', aiController.detectSpeech);
router.post('/lyric-synchronization', aiController.syncLyrics);

module.exports = router;