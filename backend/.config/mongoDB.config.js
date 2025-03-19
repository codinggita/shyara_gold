const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectUserDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "users_collection"  //  database name here
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log("connection from the .config file")
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectUserDB;