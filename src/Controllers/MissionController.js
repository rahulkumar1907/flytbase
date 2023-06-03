const { validationResult } = require('express-validator');
const Mission = require('../Model/MissionModel');
const Drone = require('../Model/DroneModel');
const Site = require('../Model/SiteModel');
const User = require("../Model/UserModel");
const Category = require('../Model/CategoryModel');

// Create a new mission
exports.createMission = async (req, res) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        req.body.userId = req["userId"];
        // Extract the mission data from the request body
        const { name, drone, site, category, waypoints, userId } = req.body;
        //    Validation for request
        if (drone == undefined || drone == "") { return res.status(400).json({ message: "Invalid drone" }); }
        if (site == undefined || site == "") { return res.status(400).json({ message: "Invalid site" }); }
        if (category == undefined || category == "") { return res.status(400).json({ message: "Invalid category" }); }
        if (waypoints == undefined || waypoints == "") { return res.status(400).json({ message: "Invalid waypoints" }); }
        if (name == undefined || name == "") { return res.status(400).json({ message: "Invalid Drone name" }); }


        const droneDetails = await Drone.findById(drone);
        if (!droneDetails) { return res.status(404).json({ message: "drone not exist" }); }
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) { return res.status(404).json({ message: "category not exist" }); }
        const siteDetails = await Site.findById(site);
        if (!siteDetails) { return res.status(404).json({ message: "site not exist" }); }

        const userDetails = await User.findById(userId);

        if (!userDetails) { return res.status(404).json({ message: "user not exist" }); }
        // console.log(droneDetails);
        // console.log(siteDetails);
        // console.log(userDetails);
        if (!(siteDetails.drones.includes(droneDetails._id))) {
            console.log("site not pass");
            return res.status(400).json({ message: "site not contain this drone" });
        } else {
            if (!(userDetails.drones.includes(droneDetails._id))) {
                console.log("user  not pass");
                return res.status(400).json({ message: "user is not assigned by this drone" });

            }
            else {
                // Create a new mission instance
                const mission = new Mission({
                    name,
                    drone,
                    site,
                    category,
                    userId,
                    waypoints,
                });

                // Save the mission to the database
                const createdMission = await mission.save();

                res.status(201).json(createdMission);
            }
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.filterMission = async (req, res) => {
    try {
        const categoryName = req.query.name;
        //  console.log(categoryName)
        const categoryDetails = await Category.findOne({ name: categoryName });
        if (!categoryDetails) { return res.status(400).json({ message: "category not exist" }); }
        //  console.log(categoryDetails)
        const findMission = await Mission.find({ category: categoryDetails._id });
        //  console.log(findMission)
        res.status(200).json(findMission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateMissionUnderSite = async (req, res) => {
    try {
        const siteId = req.params.siteId;
        req.body.userId = req["userId"];
        const { drone, site, category } = req.body;
        console.log(req.body.userId);
        if (drone == undefined || drone == "") { return res.status(400).json({ message: "Invalid drone" }); }
        if (site == undefined || site == "") { return res.status(400).json({ message: "Invalid site" }); }
        if (category == undefined || category == "") { return res.status(400).json({ message: "Invalid category" }); }
        const missionDetails = await Mission.findOne({ userId: req.body.userId });
        if (!missionDetails) { return res.status(404).json({ message: "mission not exist for this user" }); }
        const droneDetails = await Drone.findById(drone);
        const userDetails = await User.findById(req.body.userId);

        if (!userDetails) { return res.status(404).json({ message: "user not exist" }); }
        if (!droneDetails) { return res.status(404).json({ message: "drone not exist" }); }
        if (!(userDetails.drones.includes(droneDetails._id))) {
            console.log("user  not pass");
            return res.status(400).json({ message: "user is not assigned by this drone" });

        }
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) { return res.status(404).json({ message: "category not exist" }); }
        const siteDetails = await Site.findById(site);
        if (!siteDetails) { return res.status(404).json({ message: "site not exist" }); }
        if (!(siteDetails.drones.includes(droneDetails._id))) {
            console.log("site not pass");
            return res.status(400).json({ message: "site not contain this drone" });
        }
        // console.log(missionDetails)
        if (missionDetails.userId != req.body.userId) {
            { return res.status(401).json({ message: "not authorised" }); }
        } else {
            const updatedDetails = await Mission.findOneAndUpdate(
                { site: siteId },
                { drone, site, category, updated_at: Date.now() },
                { new: true }
            );
            { return res.status(200).json({ data: updatedDetails }); }

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};





exports.deleteMissionUnderSite = async (req, res) => {
    try {
        const siteId = req.params.siteId;
        const userId = req["userId"];

        const missionDetails = await Mission.findOne({ site: siteId, userId });
        if (!missionDetails) {
            return res.status(404).json({ message: "Mission does not exist for this user and site" });
        }

        await Mission.deleteOne({ _id: missionDetails._id });

        return res.status(200).json({ message: "Mission deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
