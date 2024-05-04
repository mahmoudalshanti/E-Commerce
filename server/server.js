require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const ConnectToDB = require("./config/dbConn");
const { default: mongoose } = require("mongoose");
const verifyJWT = require("./middlewares/verifyJWT");
const cookieParser = require("cookie-parser");
const PORT = 7700 || process.env.PORT;
ConnectToDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/auth"));

app.use(verifyJWT);
app.use("/product", require("./routes/product"));
app.use("/category", require("./routes/category"));
app.use("/user", require("./routes/user"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    return res.sendFile(path.join(__dirname, "view", "404.html"));
  } else if (req.accepts("json")) {
    return res.json({ message: "Not Found Page 404" });
  } else {
    return res.type("txt").send("Not Found Page");
  }
});

app.use((err, req, res, next) => {
  console.log(err.name, err.message);

  const status = res.statusCode ? res.statusCode : 500;

  res.status(status).json({
    message: {
      name: err.name,
      message: err.message,
      status: status,
    },
  });
});

mongoose.connection.once("open", () => {
  console.log("Connect to DB");
  app.listen(PORT, () =>
    console.log(`Server Work on http://localhost:${PORT}`)
  );
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

// async function run(us, pwd, role) {
//   const hashPwd = await bcrypt.hash(pwd, 10);
//   await UserModel.create({ username: us, password: hashPwd, role: role });
// }

// run("mahmoud", "123456mM@", 5021);
