const MemberModel = require("../models/member");
const ErrorHandler = require("../utils/errorHandler");



exports.registerMember = async (req, res, next) => {
  try {
    const { memberName, memberAge, sex, mobileNumber, tin } = req.body;

    // Check if the TIN is already in use
    const existingMemberWithTin = await MemberModel.findOne({ tin });
    if (existingMemberWithTin) {
      return next(new ErrorHandler("A member with this TIN already exists", 400));
    }

    // Check if the mobile number is already in use
    const existingMemberWithMobileNumber = await MemberModel.findOne({ mobileNumber });
    if (existingMemberWithMobileNumber) {
      return next(new ErrorHandler("Mobile number already exists", 400));
    }

    const member = await MemberModel.create({
      memberName,
      memberAge,
      sex,
      mobileNumber,
      tin: tin ? tin.trim() : undefined,
    });

    res.status(201).json({ success: true, member });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create Member" });
  }
};



exports.allMembers = async (req, res, next) => {
    try {
      const members = await MemberModel.find()
        .sort({ createdAt: -1 })
       
      return res.status(200).json({
        success: true,
        members,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Error fetching Members data",
      });
    }
  };


  exports.singleMember = async (req, res, next) => {
    try {
      const member = await MemberModel.findById(req.params.id);
      console.log(member, "member");
  
      if (!member) {
        return next(
          new ErrorHandler(`Member not found with id: ${req.params.id}`)
        );
      }
  
      res.status(200).json({
        success: true,
        member,
      });
    } catch (error) {
      // Handle errors here
      console.error(error);
      return next(new ErrorHandler("Error while fetching Member details"));
    }
  };

  exports.updateMember = async (req, res, next) => {
    try {
      const findMember = await MemberModel.findById(req.params.id);
  
      if (!findMember) {
        return next(
          new ErrorHandler(`Member not found with id: ${req.params.id}`)
        );
      }
  
      const { memberName, memberAge, sex, mobileNumber, tin } = req.body;
  
      const updatedMember = await MemberModel.findByIdAndUpdate(
        req.params.id,
        {
            memberName,
            memberAge,
            sex,
            mobileNumber,
            tin,
            
        },
        { new: true }
      );
  
      console.log("updated Member", updatedMember);
  
      res.status(200).json({
        success: true,
        member: updatedMember,
      });
    } catch (error) {
      console.error(error);
      return next(
        new ErrorHandler("An error occurred while updating the Member", 500)
      );
    }
  };

  
exports.deleteMember = async (req, res, next) => {
    try {
      const member = await MemberModel.findById(req.params.id);
  
      if (!member) {
        return next(
          new ErrorHandler(`Member does not exist with id: ${req.params.id}`)
        );
      }
  
      await member.deleteOne();
  
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      return next(new ErrorHandler("Error deleting the Member", 500));
    }
  };
  




