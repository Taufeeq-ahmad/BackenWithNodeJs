const mongoose = require('mongoose');
async function connectDB() {
    try{
            await mongoose.connect("mongodb+srv://selfAdmin:QoNO15FtE8gf7mHy@youtubebackend.zku741y.mongodb.net/halley");
            console.log("Connected to MongoDB");
    }catch(err){
        console.error("Error connecting to MongoDB:", err);
    }
}

module.exports = connectDB;