const mongoose = require('mongoose');

const droneSchema = new mongoose.Schema({
  drone_id: {
    type: String,
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  deleted_by: {
    type: String,
    default: "0",
  },
  deleted_on: {
    type: Date,
  },
  drone_type: {
    type: String,
    required: true,
  },
  make_name: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Drone = mongoose.model('Drone', droneSchema);

module.exports = Drone;
