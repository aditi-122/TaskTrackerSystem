const mongoose = require("mongoose");
const connectToDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL, {})
        console.log("connect to db")
    } catch (err) {
        console.log("error in connecting the db")
    }
    
}
module.exports = connectToDb;