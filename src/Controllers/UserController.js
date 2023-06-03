const User = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;
const secretKey = "skyeair";

// User Registration
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, drones } = req.body;
    //    Validation for request
    if (email == undefined || email == "") { return res.status(400).json({ message: "Invalid email" }); }
    if (password == undefined || password == "") { return res.status(400).json({ message: "Invalid password" }); }
    if (phone == undefined || phone == "") { return res.status(400).json({ message: "Invalid phone" }); }
    if (name == undefined || name == "") { return res.status(400).json({ message: "Invalid  name" }); }
    if (drones == undefined || drones == "") { return res.status(400).json({ message: "Invalid  drones" }); }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      drones
    });

    // Save the user to the database
    const createdUser = await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: createdUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// User Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check if the password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "24h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch user profile from the database
    const userProfile = await User.findById(userId);

    // Check if the user exists
    if (!userProfile) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
