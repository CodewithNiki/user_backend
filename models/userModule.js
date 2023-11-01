const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add username"]
    },
    
    email: {
        type: String,
        required: [true, "Please add email address"],
        unique: [true, "Email address already exist"]
    },   

    password: {
        type: String,
        required: [true, "Please add your password"],
    }
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("User", userSchema)