# LyricVision AI Lyrics Video Generator

## Overview
LyricVision is an AI-powered lyrics video generator that allows users to create stunning videos by uploading audio files and lyrics. The application utilizes advanced AI features for mood analysis, speech detection, and video generation.

## Features
- Upload audio and lyrics files
- AI-powered mood analysis and speech detection
- Generate videos with synchronized lyrics
- Preview and download generated videos
- Support for multiple audio formats and genres

## Project Structure
```
lyricvision-backend
├── src
│   ├── app.js
│   ├── controllers
│   │   ├── aiController.js
│   │   ├── fileUploadController.js
│   │   └── videoGenerationController.js
│   ├── routes
│   │   ├── aiRoutes.js
│   │   ├── fileUploadRoutes.js
│   │   └── videoGenerationRoutes.js
│   ├── services
│   │   ├── aiService.js
│   │   ├── fileProcessingService.js
│   │   └── videoService.js
│   ├── utils
│   │   ├── logger.js
│   │   └── errorHandler.js
│   └── config
│       ├── db.js
│       └── serverConfig.js
├── public
│   └── uploads
├── package.json
├── .env
├── .gitignore
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd lyricvision-backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add your environment variables (e.g., database connection strings).

## Usage
1. Start the server:
   ```
   npm start
   ```
2. Access the application at `http://localhost:<port>` (default port is defined in the `.env` file).

## API Endpoints
- **AI Features**
  - `POST /api/ai/mood-analysis`
  - `POST /api/ai/speech-detection`

- **File Upload**
  - `POST /api/upload/audio`
  - `POST /api/upload/lyrics`

- **Video Generation**
  - `POST /api/video/generate`
  - `GET /api/video/:id`

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.