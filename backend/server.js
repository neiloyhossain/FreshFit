const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = 5050;
const fs = require("fs");
const uploadsDir = "./uploads";

// Log every incoming request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); 

// Sample route
app.get("/api/hello", (req, res) => {
  console.log("/api/hello route hit");
  res.json({ message: "Hello from Express!" });
});

const wardrobeRoute = require("./routes/wardroberoute");
app.use("/api/wardrobe", wardrobeRoute);

const outfitRoute = require("./routes/outfitroute");
app.use("/api/outfits", outfitRoute);

const authRoute = require("./routes/authroute");
app.use("/api/auth", authRoute);

// Ensure the uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log("Created uploads directory");
}

// Replace with your actual connection string from MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://neiloyhossain:WnrhNuDBQrpu8AML@mycluster.wo2cvfc.mongodb.net/freshfit?retryWrites=true&w=majority&appName=myCluster"
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

mongoose.connection.on("connected", () => {
  console.log("Mongoose event: connected");
});
mongoose.connection.on("error", (err) => {
  console.error("Mongoose event: error", err);
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose event: disconnected");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
