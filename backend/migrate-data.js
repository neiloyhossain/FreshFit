const mongoose = require('mongoose');
const WardrobeItem = require('./models/wardrobemodel');
const Outfit = require('./models/outfitmodel');

// Connect to MongoDB (update the connection string as needed)
mongoose.connect('mongodb://localhost:27017/freshfit', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function migrateData() {
  try {
    console.log('Starting data migration...');
    
    // Clear all existing wardrobe items that don't have userId
    const wardrobeResult = await WardrobeItem.deleteMany({ userId: { $exists: false } });
    console.log(`Deleted ${wardrobeResult.deletedCount} wardrobe items without userId`);
    
    // Clear all existing outfits that don't have userId
    const outfitResult = await Outfit.deleteMany({ userId: { $exists: false } });
    console.log(`Deleted ${outfitResult.deletedCount} outfits without userId`);
    
    console.log('Migration completed successfully!');
    console.log('Now you can register/login and create new items that will be properly associated with your user account.');
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    mongoose.connection.close();
  }
}

migrateData(); 