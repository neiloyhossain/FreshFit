const express = require("express");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const User = require("../models/usermodel");
const router = express.Router();

// Registration route
router.post(
  "/register",
  [
    body("username").isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      res.status(201).json({ 
        message: "User registered successfully",
        userId: user._id,
        username: user.username
      });
    } catch (err) {
      res.status(500).json({ error: "Server error", details: err.message });
    }
  }
);

// Login route
router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    console.log("Auth: Login attempt for username:", username);
    
    try {
      const user = await User.findOne({ username });
      if (!user) {
        console.log("Auth: User not found:", username);
        return res.status(400).json({ error: "Invalid username or password" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Auth: Password mismatch for user:", username);
        return res.status(400).json({ error: "Invalid username or password" });
      }
      
      console.log("Auth: Login successful for user:", username, "userId:", user._id);
      // For a real app, generate a JWT here and send it back
      const response = { 
        message: "Login successful", 
        userId: user._id,
        username: user.username 
      };
      console.log("Auth: Sending response:", response);
      res.json(response);
    } catch (err) {
      console.error("Auth: Login error:", err);
      res.status(500).json({ error: "Server error", details: err.message });
    }
  }
);

// Get user profile
router.get("/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json({
      userId: user._id,
      username: user.username,
      fullName: user.fullName,
      bio: user.bio,
      email: user.email,
      location: user.location,
      website: user.website,
      profileImage: user.profileImage,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (err) {
    console.error("Auth: Get profile error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Update user profile
router.put("/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { fullName, bio, email, location, website, profileImage } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Update profile fields
    if (fullName !== undefined) user.fullName = fullName;
    if (bio !== undefined) user.bio = bio;
    if (email !== undefined) user.email = email;
    if (location !== undefined) user.location = location;
    if (website !== undefined) user.website = website;
    if (profileImage !== undefined) user.profileImage = profileImage;
    
    await user.save();
    
    res.json({
      message: "Profile updated successfully",
      userId: user._id,
      username: user.username,
      fullName: user.fullName,
      bio: user.bio,
      email: user.email,
      location: user.location,
      website: user.website,
      profileImage: user.profileImage,
      updatedAt: user.updatedAt
    });
  } catch (err) {
    console.error("Auth: Update profile error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router; 