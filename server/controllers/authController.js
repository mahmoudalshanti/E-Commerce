const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Must fil required fields" });

  try {
    const foundUser = await UserModel.findOne({ username: username })
      .lean()
      .exec();

    if (!foundUser)
      return res
        .status(404)
        .json({ message: `No user found with name ${username}` });

    const verifyPwd = await bcrypt.compare(password, foundUser.password);
    if (!verifyPwd)
      return res.status(406).json({ message: "Password is not correct" });

    const accessToken = Generate_ACCESS_TOKEN(
      {
        id: foundUser._id,
        username: foundUser.username,
        role: foundUser.role,
      },
      "120m"
    );

    res.cookie("token", accessToken, {
      maxAge: 120 * 60 * 1000,
    });

    return res.status(200).json({ accessToken: accessToken });
  } catch (err) {
    return res.status(500).send();
  }
};

const refreshTokenController = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.token) return res.status(401).json({ message: "Unauthorized" });

  const decodeToken = jwt.decode(cookie.token);

  try {
    const foundUser = await UserModel.findById(decodeToken.id).lean().exec();

    const accessToken = Generate_ACCESS_TOKEN(
      {
        id: foundUser._id,
        username: foundUser.username,
        role: foundUser.role,
      },
      "120m"
    );

    res.cookie("token", accessToken, {
      maxAge: 120 * 60 * 1000,
    });
    return res.status(200).json({ accessToken: accessToken });
  } catch (err) {
    return res.status(500).send();
  }
};

function Generate_ACCESS_TOKEN(payload, expiresIn) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: expiresIn,
  });
}

module.exports = {
  loginController,
  refreshTokenController,
};
