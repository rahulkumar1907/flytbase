const { validationResult } = require('express-validator');
const Drone = require('../Model/DroneModel');
const User = require('../Model/UserModel');

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
  


exports.deleteDrone = async (req, res) => {
  try {
    const userId = req["userId"];
    const droneId = req.params.droneId;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is authorized to delete the drone
    if (!user.drones.includes(droneId)) {
      return res.status(401).json({ message: "Unauthorized to delete this drone" });
    }

    // Find the drone by ID
    const drone = await Drone.findById(droneId);
    if (!drone) {
      return res.status(404).json({ message: "Drone not found" });
    }

    // Delete the drone
    await drone.remove();

    res.status(200).json({ message: "Drone deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


