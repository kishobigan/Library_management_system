const express = require("express");
const {
  createStaff,
  staffLogin,
  changePassword,
} = require("../controllers/staffController");
const authToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create-staff", authToken, createStaff);
router.post("/staff-login", staffLogin);
router.post("/staff-change-password", authToken, changePassword);

module.exports = router;
