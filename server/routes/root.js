const path = require("path");

const router = require("express").Router();

router.get("^/$|/index(.html)?", (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, "..", "view", "index.html"));
});

module.exports = router;
