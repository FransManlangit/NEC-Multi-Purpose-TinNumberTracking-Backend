const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  memberName: {
    type: String,
    required: [true, "Please enter your Full Name"],
    maxLength: [30, "Your name cannot exceed 30 characters"],
  },
  memberAge: {
    type: Number,
    required: [true, "Please enter your Age"],
  },
  sex: {
    type: String,
    required: [true, "Please enter your Sex"],
  },
  mobileNumber: {
    type: String,
    required: [true, "Please enter your Mobile Number"],
    minlength: [11, "Your Mobile Number must be 11 digits long"],
  },
  tin: {
    type: String,
    required: [true, "Tin Number is required"],
    unique: true,
    minlength: [12, "Your Tin Number must be 12 digits long"],
  },
  role: {
    type: String,
    default: "member",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Member", memberSchema);
