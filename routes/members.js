const express = require('express');
const router = express.Router();
const {
  registerMember,
  allMembers,
  singleMember,
  updateMember,
  deleteMember
} = require('../controllers/memberController');

// Define your routes
router.post('/registerMember', registerMember);
router.get('/all', allMembers);
router.get('/:id', singleMember);
router.put('/update/:id', updateMember); // Update route
router.delete('/delete/:id', deleteMember);

module.exports = router;
