const express = require("express");
const router = express.Router();
const Outfit = require("../models/outfitmodel");

// Get all outfits (history) for a specific user
router.get("/", async (req, res) => {
  const { userId } = req.query;
  console.log("User ID from query:", userId);
  
  if (!userId) {
    console.log("No userId provided, returning empty array");
    return res.json([]);
  }

  try {
    // First, let's see ALL outfits in the database
    const allOutfits = await Outfit.find({}).populate("items");
    console.log("All outfits in database:", allOutfits.map(o => ({ id: o._id, userId: o.userId, items: o.items })));
    
    // Now get outfits for this specific user
    const outfits = await Outfit.find({ userId: { $exists: true, $eq: userId } }).populate("items");
    console.log("Fetched outfits for user:", userId, outfits);
    
    // Debug: Check for outfits without userId
    const outfitsWithoutUserId = await Outfit.find({ userId: { $exists: false } });
    const outfitsWithUserId = await Outfit.find({ userId: { $exists: true } });
    console.log(`Total outfits in database: ${allOutfits.length}, Outfits without userId: ${outfitsWithoutUserId.length}, Outfits with userId: ${outfitsWithUserId.length}`);
    
    res.json(outfits);
  } catch (error) {
    console.error("Error fetching outfits:", error);
    res.status(500).json({ error: "Failed to fetch outfits" });
  }
});

// Save a new outfit
router.post("/", async (req, res) => {
  try {
    const { items, userId } = req.body;
    console.log("Received items:", items);
    console.log("Received userId:", userId);
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No items provided" });
    }
    
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }
    
    let outfit = new Outfit({ 
      items,
      userId: userId 
    });
    await outfit.save();
    outfit = await outfit.populate("items");
    console.log("Saved outfit:", outfit);
    res.status(201).json(outfit);
  } catch (err) {
    console.error("Error saving outfit:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
