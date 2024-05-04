const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CategoryModel",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    price: {
      currency: {
        type: String,
        default: "USD",
        required: true,
      },
      number: {
        type: Number,
        required: true,
      },
    },
    section: {
      type: String,
    },
    branch: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      default: "UnKnown",
    },
    sizes: {
      type: [],
      default: ["large", "medium", "small"],
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    colors: {
      type: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductModel", productSchema);
