const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");

class User {
  constructor() {}

  static async updateUsername(req, res) {
    const { id } = req.params;
    const { username } = req.body;

    if (!username)
      return res.status(400).json({ message: "Filed are required" });

    try {
      const user = await UserModel.findById(id);

      if (!user) return res.status(404).json({ message: "No user found" });

      user.username = username.toLowerCase();
      await user.save();
      return res
        .status(200)
        .json({ message: "Update username successfully", username });
    } catch (err) {
      return res.status(500).send();
    }
  }

  static async updatePassword(req, res) {
    const { id } = req.params;
    const { password } = req.body;
    if (!password)
      return res.status(400).json({ message: "Filed are required" });
    try {
      const user = await UserModel.findById(id);

      if (!user) return res.status(404).json({ message: "No user found" });

      const hashPwd = await bcrypt.hash(password, 10);
      user.password = hashPwd;
      await user.save();
      return res.status(200).json({ message: "Update password successfully" });
    } catch (err) {
      return res.status(500).send();
    }
  }
}

module.exports = User;
