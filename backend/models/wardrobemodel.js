const mongoose = require("mongoose");

const wardrobeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  imageURL: { type: String, required: true },
  uploadedBy: { type: String, default: "Neiloy Hossain" }, // Your name for proof
  userId: { type: String, required: true }, // Add userId field
});

module.exports = mongoose.model("WardrobeItem", wardrobeSchema);
