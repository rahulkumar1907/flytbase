const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  position: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  drones: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Drone',
  }],
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

siteSchema.index({ position: '2dsphere' });

const Site = mongoose.model('Site', siteSchema);

module.exports = Site;
