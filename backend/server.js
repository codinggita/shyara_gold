const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./config/cloudinaryConfig');
require('dotenv').config();

const app = express();
app.use(express.static("public"));
app.use(express.json()); // Middleware for JSON requests

// CORS Setup
const cors = require("cors");

app.use(cors({
  origin: ["http://localhost:5173", "https://shyara-gold.netlify.app"], // Add your frontend URLs
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

app.use(cors(corsOptions));

const PORT = process.env.PORT || 4001;

// MongoDB connection details
const homeUri = process.env.HOME_MONGO_URI;

let homeDb, bestSellingItems;

// Initialize MongoDB for Home Page
async function initializeDatabase() {
    try {
        if (!homeUri) throw new Error("HOME_MONGO_URI is not set in environment variables");
        const homeClient = await MongoClient.connect(homeUri);
        console.log("✅ Connected to Home Page MongoDB");
        homeDb = homeClient.db("home_page");
        bestSellingItems = homeDb.collection("best_selling_items");

        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err);
        process.exit(1);
    }
}

initializeDatabase();

// ✅ **Fetch Best-Selling Items**
app.get('/best_selling_items', async (req, res) => {
    try {
        const items = await bestSellingItems.find().toArray();
        res.status(200).json(items);
    } catch (err) {
        console.error("❌ Error fetching items:", err);
        res.status(500).json({ message: "Error fetching items", error: err.message });
    }
});

// ✅ **Configure Multer Storage for Cloudinary**
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'best_selling_items',
        format: async (req, file) => 'png',
        public_id: (req, file) => file.originalname.split('.')[0],
    },
});
const upload = multer({ storage });

// ✅ **Route 1: Upload Image using Form-Data (Multer + Cloudinary)**
app.post('/best_selling_items/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "❌ No file uploaded" });
        }

        console.log("✅ File uploaded:", req.file);

        const { name, price, description } = req.body;
        const imageUrl = req.file.path; // Cloudinary returns the URL in req.file.path

        // Insert into MongoDB
        const newItem = { name, price, description, imageUrl };
        const result = await bestSellingItems.insertOne(newItem);

        res.status(201).json({ message: "✅ Best-selling item added successfully", data: newItem });
    } catch (err) {
        console.error("❌ Error adding best-selling item:", err);
        res.status(500).json({ message: "Error adding best-selling item", error: err.message });
    }
});

// ✅ **Route 2: Store Existing Cloudinary Image URLs via JSON**
app.post('/best_selling_items', async (req, res) => {
    try {
        const { name, price, description, imageUrl } = req.body;

        if (!imageUrl) {
            return res.status(400).json({ message: "❌ Image URL is required" });
        }

        const newItem = { name, price, description, imageUrl };
        const result = await bestSellingItems.insertOne(newItem);

        res.status(201).json({ message: "✅ Best-selling item added successfully", data: newItem });
    } catch (err) {
        console.error("❌ Error adding best-selling item:", err);
        res.status(500).json({ message: "Error adding best-selling item", error: err.message });
    }
});

