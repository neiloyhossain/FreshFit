const mongoose = require("mongoose");
const User = require("./models/usermodel");

// Connect to MongoDB Atlas (same as server.js)
mongoose.connect(
  "mongodb+srv://neiloyhossain:WnrhNuDBQrpu8AML@mycluster.wo2cvfc.mongodb.net/freshfit?retryWrites=true&w=majority&appName=myCluster"
).then(() => {
  console.log("Connected to MongoDB Atlas successfully");
}).catch((err) => {
  console.error("Failed to connect to MongoDB Atlas:", err.message);
  process.exit(1);
});

const migrateProfiles = async () => {
  try {
    console.log("Starting profile migration...");
    
    // Find all users that don't have the new profile fields
    const usersToUpdate = await User.find({
      $or: [
        { fullName: { $exists: false } },
        { bio: { $exists: false } },
        { email: { $exists: false } },
        { location: { $exists: false } },
        { website: { $exists: false } },
        { profileImage: { $exists: false } },
        { updatedAt: { $exists: false } }
      ]
    });

    console.log(`Found ${usersToUpdate.length} users to migrate`);

    for (const user of usersToUpdate) {
      // Set default values for new fields
      user.fullName = user.fullName || "";
      user.bio = user.bio || "";
      user.email = user.email || "";
      user.location = user.location || "";
      user.website = user.website || "";
      user.profileImage = user.profileImage || "";
      user.updatedAt = user.updatedAt || user.createdAt || new Date();
      
      await user.save();
      console.log(`Migrated user: ${user.username}`);
    }

    console.log("Profile migration completed successfully!");
  } catch (error) {
    console.error("Migration error:", error);
  } finally {
    mongoose.connection.close();
  }
};

migrateProfiles(); 