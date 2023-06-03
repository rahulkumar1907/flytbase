const { validationResult } = require('express-validator');
const Drone = require('../Model/DroneModel');

// Create a new drone
exports.createDrone = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract the drone data from the request body
    const { drone_id, drone_type, make_name, name } = req.body;
    //    Validation for request
    if(drone_id==undefined||drone_id==""){return res.status(400).json({ message:"Invalid Drone Id" });}
    if(drone_type==undefined||drone_type==""){return res.status(400).json({ message:"Invalid Drone Type" });}
    if(make_name==undefined||make_name==""){return res.status(400).json({ message:"Invalid Drone Make Name" });}
    if(name==undefined||name==""){return res.status(400).json({ message:"Invalid Drone name" });}
    // Create a new drone instance
    const drone = new Drone({
      drone_id,
      drone_type,
      make_name,
      name
    });

    // Save the drone to the database
    const createdDrone = await drone.save();

    res.status(201).json(createdDrone);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
