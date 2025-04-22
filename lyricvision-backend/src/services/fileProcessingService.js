class FileProcessingService {
    constructor(uploadDir) {
        this.uploadDir = uploadDir;
    }

    async validateFile(file) {
        const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/flac', 'text/plain'];
        if (!allowedTypes.includes(file.mimetype)) {
            throw new Error('Invalid file type. Only audio and text files are allowed.');
        }
    }

    async saveFile(file) {
        const fs = require('fs');
        const path = require('path');

        const filePath = path.join(this.uploadDir, file.name);
        return new Promise((resolve, reject) => {
            const stream = fs.createWriteStream(filePath);
            file.data.pipe(stream);
            file.data.on('end', () => resolve(filePath));
            file.data.on('error', (err) => reject(err));
        });
    }

    async processFiles(audioFile, lyricsFile) {
        await this.validateFile(audioFile);
        await this.validateFile(lyricsFile);

        const audioFilePath = await this.saveFile(audioFile);
        const lyricsFilePath = await this.saveFile(lyricsFile);

        return {
            audioFilePath,
            lyricsFilePath
        };
    }
}

module.exports = FileProcessingService;