const mongoose = require('mongoose');
const WardrobeItem = require('./models/wardrobemodel');
const Outfit = require('./models/outfitmodel');

// Connect to MongoDB (update the connection string as needed)
mongoose.connect('mongodb://localhost:27017/freshfit', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function clearCollections() {
  try {
    console.log('Starting to clear collections...');
    
    // Clear all wardrobe items
    const wardrobeResult = await WardrobeItem.deleteMany({});
    console.log(`Deleted ${wardrobeResult.deletedCount} wardrobe items`);
    
    // Clear all outfits
    const outfitResult = await Outfit.deleteMany({});
    console.log(`Deleted ${outfitResult.deletedCount} outfits`);
    
    console.log('Collections cleared successfully!');
    console.log('Now you can start fresh with user-specific data.');
    
  } catch (error) {
    console.error('Failed to clear collections:', error);
  } finally {
    mongoose.connection.close();
  }
}

clearCollections(); 