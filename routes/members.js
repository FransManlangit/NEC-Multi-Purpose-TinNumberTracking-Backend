const express = require("express");
const router = express.Router();


const {
    registerMember,
    allMembers,
    singleMember,
    updateMember,
    deleteMember,
} = require("../controllers/memberController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");


router.post("/registerMember", registerMember);
router.get("/allMembers", allMembers);
router.get("/singleMember", singleMember);
router.put("/updateMember,", updateMember);
router.delete("/deleteMember,", deleteMember);





module.exports = router;