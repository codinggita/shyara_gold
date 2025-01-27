const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 4002;

// MongoDB connection details
const uri = "mongodb://127.0.0.1:27017";
const dbName = "home_page";

let db, best_selling_items;

// Connect to MongoDB and initialize collections
async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(uri);
        console.log("Connected to MongoDB");

        db = client.db(dbName);
        best_selling_items = db.collection("best_selling_items");

        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
}

initializeDatabase();

// GET: Fetch all best-selling items
app.get('/best_selling_items', async (req, res) => {
    try {
        const items = await best_selling_items.find().toArray();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).send("Error fetching items: " + err.message);
    }
});

