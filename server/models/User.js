const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
}, { timestamps: true });

module.exports = User = mongoose.model("user", UserSchema);