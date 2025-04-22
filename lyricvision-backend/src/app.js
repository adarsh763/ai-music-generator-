const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errorHandler } = require('./utils/errorHandler');
const logger = require('./utils/logger');
const fileUploadRoutes = require('./routes/fileUploadRoutes');
const videoGenerationRoutes = require('./routes/videoGenerationRoutes');
const aiRoutes = require('./routes/aiRoutes');
const { connectDB } = require('./config/db');
const serverConfig = require('./config/serverConfig');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the database
connectDB();

// Routes
app.use('/api/uploads', fileUploadRoutes);
app.use('/api/videos', videoGenerationRoutes);
app.use('/api/ai', aiRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = serverConfig.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});