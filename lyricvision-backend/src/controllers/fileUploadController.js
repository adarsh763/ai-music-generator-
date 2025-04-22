class FileUploadController {
    async uploadAudio(req, res) {
        try {
            const audioFile = req.file;
            if (!audioFile) {
                return res.status(400).json({ message: 'No audio file uploaded.' });
            }
            // Logic to process and store the audio file
            res.status(200).json({ message: 'Audio file uploaded successfully.', file: audioFile });
        } catch (error) {
            res.status(500).json({ message: 'Error uploading audio file.', error: error.message });
        }
    }

    async uploadLyrics(req, res) {
        try {
            const lyricsFile = req.file;
            if (!lyricsFile) {
                return res.status(400).json({ message: 'No lyrics file uploaded.' });
            }
            // Logic to process and store the lyrics file
            res.status(200).json({ message: 'Lyrics file uploaded successfully.', file: lyricsFile });
        } catch (error) {
            res.status(500).json({ message: 'Error uploading lyrics file.', error: error.message });
        }
    }
}

export default new FileUploadController();