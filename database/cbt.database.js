const mongoose = require('mongoose');



const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("CBT Database is Connected");
    } catch (error) {
        console.log("CBT Database has been Disconnected");
    }
}




module.exports = connectDB;