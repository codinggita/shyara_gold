const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 4003; // Different port to avoid conflicts

// MongoDB connection details for Atlas
const uri = "mongodb+srv://Dhruveshshyara16:Dhruvesh1611@cluster1.mi6ov.mongodb.net/users_collection?retryWrites=true&w=majority";
const dbName = "users_collection";  // Database name

let db, users_design_data;

// Connect to MongoDB and initialize collections
async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        db = client.db(dbName);
        users_design_data = db.collection("users_design_data"); // Corrected collection name

        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
}

initializeDatabase();

// GET: Fetch all users from users_design_data collection
app.get('/users_design_data', async (req, res) => {
    try {
        const users = await users_design_data.find().toArray();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send("Error fetching users: " + err.message);
    }
});
