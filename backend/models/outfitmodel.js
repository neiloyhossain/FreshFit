const mongoose = require("mongoose");

const outfitSchema = new mongoose.Schema({
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "WardrobeItem" }],
  generatedAt: { type: Date, default: Date.now },
  userId: { type: String, required: true }, // Add userId field
});

module.exports = mongoose.model("Outfit", outfitSchema);
