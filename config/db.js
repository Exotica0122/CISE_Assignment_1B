const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
        });

        console.log("MongoDB is Connected...");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log("MongoDB is Disconnected...");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

exports.connectDB = connectDB;
exports.disconnectDB = disconnectDB;
