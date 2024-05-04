const router = require("express").Router();
const path = require("path");
const Product = require("../classes/Product");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination directory
    cb(null, path.join(__dirname, "..", "public", "images"));
  },

  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);

    req.fileUniqueName = file.fieldname + "-" + uniqueSuffix + fileExtension;
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage });

// router.post("/upload", upload.single("image"), (req, res) => {
//   console.log(req.file);
//   console.log(req?.file?.fieldname);
//   return res.status(200).send();
// });

router.get("/", Product.getAll);
router.get("/:id", Product.get);

router.post("/", Product.create, upload.single("image"), (req, res) => {
  req.product.cover = ` http://localhost:7700/images/${req.fileUniqueName}`;
});

router.patch("/:id", Product.update);

router.delete("/:id", Product.delete);

module.exports = router;
