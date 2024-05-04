const path = require("path");
const User = require("../classes/User");

const router = require("express").Router();

router.patch("/username/:id", User.updateUsername);
router.patch("/password/:id", User.updatePassword);

module.exports = router;
