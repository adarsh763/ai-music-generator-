const mongoose = require('mongoose');

const LicenseSchema = new mongoose.Schema({
  track: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Track',
    required: true,
  },
  licenseType: {
    type: String,
    enum: ['commercial', 'non-commercial', 'royalty-free'],
    default: 'commercial',
  },
  issuedAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: Date,
  cost: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  details: String
});

module.exports = mongoose.model('License', LicenseSchema); 