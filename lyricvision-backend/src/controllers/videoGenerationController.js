class VideoGenerationController {
    constructor(videoService) {
        this.videoService = videoService;
    }

    async generateVideo(req, res) {
        try {
            const { audioFile, lyricsFile, genre, videoQuality } = req.body;

            // Validate input
            if (!audioFile || !lyricsFile || !genre || !videoQuality) {
                return res.status(400).json({ message: 'All fields are required.' });
            }

            // Call the video service to generate the video
            const videoData = await this.videoService.createVideo(audioFile, lyricsFile, genre, videoQuality);
            return res.status(201).json(videoData);
        } catch (error) {
            return res.status(500).json({ message: 'Error generating video', error: error.message });
        }
    }

    async getVideo(req, res) {
        try {
            const { videoId } = req.params;

            // Call the video service to retrieve the video
            const video = await this.videoService.getVideoById(videoId);
            if (!video) {
                return res.status(404).json({ message: 'Video not found' });
            }

            return res.status(200).json(video);
        } catch (error) {
            return res.status(500).json({ message: 'Error retrieving video', error: error.message });
        }
    }
}

export default VideoGenerationController;