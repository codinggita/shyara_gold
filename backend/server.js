const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb'); // ✅ Import ObjectId
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./config/cloudinaryConfig');
require('dotenv').config();

const app = express();
app.use(express.static("public"));
app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5173", "https://shyara-gold.netlify.app"],
    methods: "GET,POST,DELETE",
    credentials: true
}));

const PORT = process.env.PORT || 4001;

// ✅ MongoDB connection details
const userDesignUri = process.env.USERS_MONGO_URI; // Use the correct env variable from Render


let userDesignDb, userDesignCollection;

// ✅ Initialize MongoDB for User Designs
async function initializeUserDesignDatabase() {
    try {
        if (!userDesignUri) throw new Error("USER_DESIGN_MONGO_URI is not set in environment variables");
        const userDesignClient = await MongoClient.connect(userDesignUri);
        console.log("✅ Connected to Users Design MongoDB");
        userDesignDb = userDesignClient.db("users_collection");
        userDesignCollection = userDesignDb.collection("users_design_data");

        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });

    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err);
        process.exit(1);
    }
}

initializeUserDesignDatabase();

// ✅ **Fetch All User Designs**
app.get('/users_design_data', async (req, res) => {
    try {
        console.log("🔹 Fetching all user designs...");
        const count = await userDesignCollection.countDocuments();
        console.log(`✅ Total Documents Found: ${count}`);

        const designs = await userDesignCollection.find().toArray();
        console.log("✅ Data Fetched:", designs);

        res.status(200).json(designs);
    } catch (err) {
        console.error("❌ Error fetching user designs:", err);
        res.status(500).json({ message: "Error fetching user designs", error: err.message });
    }
});

// ✅ **Fetch Single User Design by ID**
app.get('/users_design_data/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const design = await userDesignCollection.findOne({ _id: new ObjectId(id) });

        if (!design) {
            return res.status(404).json({ message: "❌ Design not found" });
        }

        res.status(200).json(design);
    } catch (err) {
        console.error("❌ Error fetching user design:", err);
        res.status(500).json({ message: "Error fetching user design", error: err.message });
    }
});

// ✅ **Configure Multer Storage for Cloudinary**
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'users_designs',
        format: async () => 'png',
        public_id: (req, file) => file.originalname.split('.')[0],
    },
});
const upload = multer({ storage });

// ✅ **Upload User Design (Image + Details)**
app.post('/users_design_data/upload', upload.single('image'), async (req, res) => {
    try {
        console.log("🔹 POST request received at /users_design_data/upload");

        if (!req.file) {
            console.log("❌ No file uploaded");
            return res.status(400).json({ message: "❌ No file uploaded" });
        }
        console.log("✅ Uploaded File:", req.file);

        const { name, email, mobile, material, style, goldType } = req.body;

        if (!name || !email || !mobile || !material || !style || !goldType) {
            console.log("❌ Missing required fields:", { name, email, mobile, material, style, goldType });
            return res.status(400).json({ message: "❌ Missing required fields" });
        }

        const imageUrl = req.file.path;
        console.log("✅ Image URL:", imageUrl);

        // Insert into MongoDB
        const newDesign = { name, email, mobile, material, style, goldType, imageUrl };
        const result = await userDesignCollection.insertOne(newDesign);

        console.log("✅ Successfully added to database:", newDesign);
        res.status(201).json({ message: "✅ User design added successfully", data: newDesign });

    } catch (err) {
        console.error("❌ Internal Server Error:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

// ✅ **Store Existing Cloudinary Image URLs via JSON**
app.post('/users_design_data', async (req, res) => {
    try {
        const { name, email, mobile, material, style, goldType, imageUrl } = req.body;

        if (!imageUrl) {
            return res.status(400).json({ message: "❌ Image URL is required" });
        }

        const newDesign = { name, email, mobile, material, style, goldType, imageUrl };
        const result = await userDesignCollection.insertOne(newDesign);

        res.status(201).json({ message: "✅ User design added successfully", data: newDesign });
    } catch (err) {
        console.error("❌ Error adding user design:", err);
        res.status(500).json({ message: "Error adding user design", error: err.message });
    }
});

// ✅ **Delete User Design by ID**
app.delete('/users_design_data/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete design
        const result = await userDesignCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "❌ Design not found" });
        }

        res.status(200).json({ message: "✅ Design deleted successfully" });
    } catch (err) {
        console.error("❌ Error deleting user design:", err);
        res.status(500).json({ message: "Error deleting user design", error: err.message });
    }
});
