const mongoose = require("mongoose");

const categoryModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    sections: {
      type: [],
    },

    branches: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("CategoryModel", categoryModel);
