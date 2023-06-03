const express = require('express');
const router = express.Router();
const userController = require("../Controllers/UserController")
const droneController = require("../Controllers/DroneController")
const missionController = require("../Controllers/MissionController")
const siteController = require("../Controllers/SiteController")
const categoryController = require("../Controllers/CategoryController")
const middleWare = require("../Middleware/Middleware")


router.post("/register",userController.registerUser)
router.post("/login",userController.loginUser)
router.get("/profile/:userId",middleWare.authentication, userController.getUserProfile);
router.post("/create-drone",middleWare.authentication,droneController.createDrone)
router.post("/create-mission",middleWare.authentication,missionController.createMission)
router.get("/filter-mission",missionController.filterMission)
router.put("/mission/:siteId",middleWare.authentication,missionController.updateMissionUnderSite)
router.delete("/mission/:siteId",middleWare.authentication,missionController.deleteMissionUnderSite)
router.post("/create-site",middleWare.authentication,siteController.createSite)
router.put("/update/:siteId",middleWare.authentication,siteController.updateSite)
router.put("/drone/:siteId",middleWare.authentication,siteController.deleteDroneUnderSite)

router.post("/create-category",middleWare.authentication,categoryController.createCategory)








module.exports = router;