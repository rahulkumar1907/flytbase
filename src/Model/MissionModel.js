const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  drone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Drone',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Drone',
    required: true,
  },
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site',
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  waypoints: [
    {
      alt: Number,
      lat: Number,
      lng: Number,
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Mission = mongoose.model('Mission', missionSchema);

module.exports = Mission;
