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
    validate: {
      validator: function(v) {
        return !this.otherGovtId && (!v || v.trim()); // Valid if otherGovtId not provided and tin is not empty
      },
      message: "Tin Number is required if otherGovtId is not provided",
    },
    unique: true,
    minlength: [12, "Your Tin Number must be 12 digits long"],
  },
  otherGovtId: {
    type: String,
    unique: true,
    validate: {
      validator: function(v) {
        return this.tin || (!v || v.trim()); // Valid if tin provided or otherGovtId is not empty
      },
      message: "otherGovtId is required if Tin Number is not provided",
    },
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
