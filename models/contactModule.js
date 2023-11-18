const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    firstName: {
      type: String,
      required: [true, "Please add first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add last name"],
    },
    email: {
      type: String,
      required: [true, "Please add email address"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please add phone number"],
    },
    image: {
      data: Buffer, // Binary data of the image
      contentType: String, // MIME type of the image (e.g., 'image/jpeg', 'image/png', etc.)
    },
    lastViewedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
