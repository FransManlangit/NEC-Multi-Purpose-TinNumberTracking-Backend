const MemberModel = require("../models/member");
const ErrorHandler = require("../utils/errorHandler");

exports.registerMember = async (req, res, next) => {
  try {
    const { memberName, memberAge, sex, mobileNumber, tin, otherGovtId } =
      req.body;

    // Check if the member already exists in the database
    const existingMember = await MemberModel.findOne({ memberName });

    if (existingMember) {
      return next(new ErrorHandler("Member already exists", 409));
    }

    // Validate otherGovtId if present and tin is not provided
    if (!tin && (!otherGovtId || !otherGovtId.trim())) {
      return next(
        new ErrorHandler("otherGovtId is required if tin is not provided", 400)
      );
    }

    const member = await MemberModel.create({
      memberName,
      memberAge,
      sex,
      mobileNumber,
      tin,
      otherGovtId,
    });

    res.status(201).json({ success: true, member });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create Member" });
  }
};

exports.allMembers = async (req, res, next) => {
  try {
    const members = await MemberModel.find().sort({ createdAt: -1 });
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
    console.error(error);
    return next(new ErrorHandler("Error while fetching Member details"));
  }
};

exports.updateMember = async (req, res, next) => {
  try {
    const memberId = req.params.id;
    const userData = req.body;

    // Find and update the member
    const updatedMember = await MemberModel.findByIdAndUpdate(
      memberId,
      userData,
      { new: true }
    );

    if (!updatedMember) {
      return next(new ErrorHandler("Member not found", 404));
    }

    console.log("Updated member:", updatedMember);

    res.status(200).json({
      success: true,
      member: updatedMember,
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorHandler("Error updating the Member", 500));
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
