const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

    firstName: {
        type: String,
        required: [true, "Please add first name"]
    },
    lastName: {
        type: String,
        required: [true, "Please add last name"]
    },
    email: {
        type: String,
        required: [true, "Please add email address"]
    },   
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Contact", contactSchema)