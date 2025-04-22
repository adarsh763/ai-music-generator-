require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');
const logger = require('./utils/logger');

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json({ limit: '10mb' })); // large limit for uploads
app.use(express.urlencoded({ extended: true }));

// Static files serving for generated assets
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/music', require('./routes/musicRoutes'));
app.use('/api/vocals', require('./routes/vocalRoutes'));
app.use('/api/song', require('./routes/songStructureRoutes'));
app.use('/api/monetization', require('./routes/monetizationRoutes'));
app.use('/api/community', require('./routes/communityRoutes'));
app.use('/api/lyrics', require('./routes/lyricRoutes'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
}); 