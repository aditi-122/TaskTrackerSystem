const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    googleId:{type:String,unique:true},
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamp: {
        createdAt: true,
        updatedAt: true
    }
}
)
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;