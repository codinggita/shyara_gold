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

app.use(cors({
    origin: ["http://localhost:5173", "https://shyara-gold.netlify.app"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

const PORT = process.env.PORT || 4001;

// ✅ MongoDB connection details
const homeUri = process.env.HOME_MONGO_URI;
const usersUri = process.env.USERS_MONGO_URI;

let homeDb, bestSellingItems;
let usersDb, usersDesignData;

// ✅ Initialize MongoDB for Home Page & Users Collection
async function initializeDatabase() {
    try {
        if (!homeUri || !usersUri) throw new Error("MongoDB URIs are not set in environment variables");

        // ✅ Home Page DB
        const homeClient = await MongoClient.connect(homeUri);
        console.log("✅ Connected to Home Page MongoDB");
        homeDb = homeClient.db("home_page");
        bestSellingItems = homeDb.collection("best_selling_items");

        // ✅ Users Collection DB
        const usersClient = await MongoClient.connect(usersUri);
        console.log("✅ Connected to Users Collection MongoDB");
        usersDb = usersClient.db("users_collection");
        usersDesignData = usersDb.collection("users_design_data");

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
        format: async () => 'png',
        public_id: (req, file) => file.originalname.split('.')[0],
    },
});
const upload = multer({ storage });

// ✅ **Upload Best-Selling Item with Image**
app.post('/best_selling_items/upload', upload.single('image'), async (req, res) => {
    try {
        console.log("🔹 POST request received at /best_selling_items/upload");

        if (!req.file) {
            console.log("❌ No file uploaded");
            return res.status(400).json({ message: "❌ No file uploaded" });
        }
        console.log("✅ Uploaded File:", req.file);

        const { name, price, description } = req.body;
        if (!name || !price || !description) {
            return res.status(400).json({ message: "❌ Missing required fields" });
        }

        const imageUrl = req.file.path;
        const newItem = { name, price, description, imageUrl };
        await bestSellingItems.insertOne(newItem);

        console.log("✅ Successfully added to database:", newItem);
        res.status(201).json({ message: "✅ Best-selling item added successfully", data: newItem });

    } catch (err) {
        console.error("❌ Internal Server Error:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

// ✅ **Add Best-Selling Item without Uploading Image**
app.post('/best_selling_items', async (req, res) => {
    try {
        const { name, price, description, imageUrl } = req.body;
        if (!imageUrl) {
            return res.status(400).json({ message: "❌ Image URL is required" });
        }

        const newItem = { name, price, description, imageUrl };
        await bestSellingItems.insertOne(newItem);

        res.status(201).json({ message: "✅ Best-selling item added successfully", data: newItem });
    } catch (err) {
        console.error("❌ Error adding best-selling item:", err);
        res.status(500).json({ message: "Error adding best-selling item", error: err.message });
    }
});

// ✅ **Fetch Users' Design Data**
app.get('/users_design_data', async (req, res) => {
    try {
        const designs = await usersDesignData.find().toArray();
        res.status(200).json(designs);
    } catch (err) {
        console.error("❌ Error fetching users' design data:", err);
        res.status(500).json({ message: "Error fetching design data", error: err.message });
    }
});

// ✅ **Upload Users' Design Data with Image**
const userDesignStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'users_design_data',
        format: async () => 'png',
        public_id: (req, file) => file.originalname.split('.')[0],
    },
});
const userDesignUpload = multer({ storage: userDesignStorage });

app.post('/users_design_data/upload', userDesignUpload.single('image'), async (req, res) => {
    try {
        console.log("🔹 POST request received at /users_design_data/upload");

        if (!req.file) {
            console.log("❌ No file uploaded");
            return res.status(400).json({ message: "❌ No file uploaded" });
        }

        console.log("✅ Uploaded File:", req.file);
        const { user, title, description } = req.body;

        if (!user || !title || !description) {
            return res.status(400).json({ message: "❌ Missing required fields" });
        }

        const imageUrl = req.file.path;
        const newDesign = { user, title, description, imageUrl };
        await usersDesignData.insertOne(newDesign);

        console.log("✅ Successfully added to database:", newDesign);
        res.status(201).json({ message: "✅ User design added successfully", data: newDesign });

    } catch (err) {
        console.error("❌ Internal Server Error:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

// ✅ **Add Users' Design Data without Uploading Image**
app.post('/users_design_data', async (req, res) => {
    try {
        const { user, title, description, imageUrl } = req.body;
        if (!imageUrl) {
            return res.status(400).json({ message: "❌ Image URL is required" });
        }

        const newDesign = { user, title, description, imageUrl };
        await usersDesignData.insertOne(newDesign);

        res.status(201).json({ message: "✅ User design added successfully", data: newDesign });
    } catch (err) {
        console.error("❌ Error adding users' design data:", err);
        res.status(500).json({ message: "Error adding design data", error: err.message });
    }
});

// ✅ **Delete Users' Design Data**
app.delete('/users_design_data/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await usersDesignData.deleteOne({ _id: new MongoClient.ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "❌ Design not found" });
        }

        res.status(200).json({ message: "✅ User design deleted successfully" });
    } catch (err) {
        console.error("❌ Error deleting design data:", err);
        res.status(500).json({ message: "Error deleting design data", error: err.message });
    }
});
