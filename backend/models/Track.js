const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Metadata for the generated track
  title: {
    type: String,
    default: 'Untitled Track',
  },
  description: String,
  fileUrl: {
    type: String,
    required: true,
  },
  stemsUrls: { // AI stem separation URLs: drums, vocals, bass, etc.
    drums: String,
    vocals: String,
    bass: String,
    melody: String,
    others: [String]
  },
  genre: String,
  mood: String,
  tempo: Number,
  instrumentation: [String],
  lyrics: String,
  language: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  licenseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'License',
  },
  collaborators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  versions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HistoryVersion'
  }],
  isPublic: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Track', TrackSchema); 