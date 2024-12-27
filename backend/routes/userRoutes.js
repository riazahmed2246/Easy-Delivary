const express = require("express");
const { registerUser, loginUser, updateUserProfile, registerRole } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", protect, updateUserProfile);
router.put("/role", protect, registerRole);

module.exports = router;
