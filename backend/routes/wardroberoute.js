const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const WardrobeItem = require("../models/wardrobemodel");

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads")); // Save files to /backend/uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Debug route to see all items and their userId values
router.get("/debug", async (req, res) => {
  try {
    const allItems = await WardrobeItem.find({});
    console.log("DEBUG: All items in database:", allItems);
    res.json({
      totalItems: allItems.length,
      items: allItems,
      itemsWithUserId: allItems.filter(item => item.userId),
      itemsWithoutUserId: allItems.filter(item => !item.userId)
    });
  } catch (err) {
    console.error("Debug route error:", err);
    res.status(500).json({ error: "Debug route error", details: err.message });
  }
});

// Simple test route to check current user
router.get("/test-user", async (req, res) => {
  try {
    const { userId } = req.query;
    console.log("TEST: User ID from query:", userId);
    
    // Get all items
    const allItems = await WardrobeItem.find({});
    console.log("TEST: All items:", allItems.map(item => ({ name: item.name, userId: item.userId })));
    
    // Get items for this user
    const userItems = await WardrobeItem.find({ userId: { $exists: true, $eq: userId } });
    console.log("TEST: Items for user", userId, ":", userItems.map(item => ({ name: item.name, userId: item.userId })));
    
    res.json({
      requestedUserId: userId,
      totalItems: allItems.length,
      userItems: userItems.length,
      allItems: allItems.map(item => ({ name: item.name, userId: item.userId })),
      userItemsList: userItems.map(item => ({ name: item.name, userId: item.userId }))
    });
  } catch (err) {
    console.error("Test route error:", err);
    res.status(500).json({ error: "Test route error", details: err.message });
  }
});

// Get all wardrobe items for a specific user
router.get("/", async (req, res) => {
  console.log("GET /api/wardrobe called");
  try {
    const { userId } = req.query;
    console.log("User ID from query:", userId);
    
    if (!userId) {
      console.log("No userId provided, returning empty array");
      return res.json([]);
    }
    
    // Only return items that have a userId field and match the current user
    const items = await WardrobeItem.find({ 
      userId: { $exists: true, $eq: userId } 
    });
    console.log("Fetched items for user:", userId, items);
    
    // If no items found for this user, check if there are any items without userId
    if (items.length === 0) {
      const totalItems = await WardrobeItem.countDocuments();
      const itemsWithoutUserId = await WardrobeItem.countDocuments({ userId: { $exists: false } });
      const itemsWithUserId = await WardrobeItem.countDocuments({ userId: { $exists: true } });
      console.log(`Total items in database: ${totalItems}, Items without userId: ${itemsWithoutUserId}, Items with userId: ${itemsWithUserId}`);
      
      if (itemsWithoutUserId > 0) {
        console.log("Found items without userId - these need to be migrated or cleared");
      }
    }
    
    res.json(items);
  } catch (err) {
    console.error("Error fetching wardrobe items:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Add a new wardrobe item with file upload
router.post("/", upload.single("image"), async (req, res) => {
  console.log("POST /api/wardrobe called");
  console.log("Request body:", req.body);
  console.log("Request file:", req.file);
  try {
    const { name, category, uploadedBy, userId } = req.body;
    if (!name || !category || !req.file || !userId) {
      console.error("Missing required fields:", { name, category, file: req.file, userId });
      return res.status(400).json({ error: "Missing required fields" });
    }
    const item = new WardrobeItem({
      name,
      category,
      imageURL: `/uploads/${req.file.filename}`,
      uploadedBy: uploadedBy || "Neiloy Hossain",
      userId: userId,
    });
    await item.save();
    console.log("Saved item:", item);
    res.status(201).json(item);
  } catch (err) {
    console.error("Error saving wardrobe item:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Test route works!" });
});

// Temporary route to clear collections (remove this after use)
router.delete("/clear-all", async (req, res) => {
  try {
    console.log("Clearing all collections...");
    
    // Clear all wardrobe items
    const wardrobeResult = await WardrobeItem.deleteMany({});
    console.log(`Deleted ${wardrobeResult.deletedCount} wardrobe items`);
    
    // Clear all outfits
    const Outfit = require("../models/outfitmodel");
    const outfitResult = await Outfit.deleteMany({});
    console.log(`Deleted ${outfitResult.deletedCount} outfits`);
    
    res.json({
      message: "Collections cleared successfully",
      deletedWardrobeItems: wardrobeResult.deletedCount,
      deletedOutfits: outfitResult.deletedCount
    });
  } catch (err) {
    console.error("Error clearing collections:", err);
    res.status(500).json({ error: "Failed to clear collections", details: err.message });
  }
});

module.exports = router;
