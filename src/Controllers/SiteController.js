const { validationResult } = require('express-validator');
const Site = require('../Model/SiteModel');

// Create a new site
const createSite = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    req.body.userId=req["userId"]
    const { name, position, drones,userId, categories } = req.body;
    console.log(req.body)
    //    Validation for request
    if(name==undefined||name==""){return res.status(400).json({ message:"Invalid name" });}
    if(position==undefined||position==""){return res.status(400).json({ message:"Invalid position " });}
    if(drones==undefined||drones==""){return res.status(400).json({ message:"Invalid drones" });}
    if(categories==undefined||categories==""){return res.status(400).json({ message:"Invalid categories" });}
    const site = new Site({
      name,
      position,
      drones,
      userId,
      categories,
    });

    const savedSite = await site.save();
    res.status(201).json(savedSite);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a site' });
  }
};


// Update a site by ID
const updateSite = async (req, res) => {
    try {
      const { siteId } = req.params;
      req.body.userId=req["userId"]
      const { name, location,drones,categories } = req.body;
      const userId = req.body.userId; // Assuming user authentication and extracting user ID from the request
     const findSite=await Site.findOne({_id:siteId,userId:userId})
     if(!findSite) return res.status(404).json({ error: 'Site not found for log in user' });
      const site = await Site.findOneAndUpdate(
        { _id: siteId, userId },
        { name, location,drones ,categories},
        { new: true }
      );
  
      if (!site) {
        return res.status(404).json({ error: 'Site not found' });
      }
  
      res.status(200).json({ message: 'Site updated successfully', site });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  const deleteDroneUnderSite = async (req, res) => {
    try {
      const { siteId } = req.params;
      req.body.userId=req["userId"]
      const { drones } = req.body;
      const userId = req.body.userId; // Assuming user authentication and extracting user ID from the request
     const findSite=await Site.findOne({_id:siteId,userId:userId})
    //  console.log(findSite.drones)
    //  const DroneDataToPut = findSite.drones.filter((item) => !drones.includes(item.toString()));
    //  console.log((JSON.stringify(DroneDataToPut)))
     if(!findSite) return res.status(404).json({ error: 'Site not found for log in user' });
      const site = await Site.findOneAndUpdate(
        { _id: siteId, userId },
        { $pull: { drones: { $in: drones } } },
        { new: true }      );
  
      if (!site) {
        return res.status(404).json({ error: 'Site not to delete found' });
      }
  
      res.status(200).json({ message: 'Site updated successfully', site });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  
  
// Delete a site by ID
const deleteSiteById = async (req, res) => {
  try {
    const { siteId } = req.params;
    req.body.userId=req["userId"]
    const userId=req.body.userId
    
    const deletedSite = await Site.findOneAndDelete({_id:siteId,userId:userId});
    
    if (!deletedSite) {
      return res.status(404).json({ error: 'Site not for log in user found' });
    }
    
    res.status(200).json({ message: 'Site deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the site' });
  }
};

module.exports = {
  createSite,
  updateSite,
  deleteDroneUnderSite,
  deleteSiteById,
};
