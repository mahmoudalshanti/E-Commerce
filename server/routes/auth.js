const path = require("path");
const {
  loginController,
  refreshTokenController,
} = require("../controllers/authController");

const router = require("express").Router();

router.post("/login", loginController);
router.get("/refreshToken", refreshTokenController);

module.exports = router;
