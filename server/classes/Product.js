const {
  lengthOfDescriptionChecker,
  titleIsConflictProductChecker,
} = require("../functions/checker-functions");

const ProductModel = require("../model/ProductModel");
const Category = require("./Category");

class Product {
  constructor() {
    console.log("Product Class, Controller");
  }
  // CRUD RESTful API

  static async get(req, res) {
    const { id } = req.params;

    try {
      const product = await ProductModel.findById(id).lean();
      return res.status(200).json({ product: product });
    } catch (err) {
      return res.status(500).send();
    }
  }

  //get all Products Method and handel http request
  static async getAll(req, res) {
    try {
      const products = await ProductModel.find({}).lean();

      return res.status(200).json({ products: products });
    } catch (err) {
      return res.status(500).send();
    }
  }

  // create product Method handel http request
  static async create(req, res, next) {
    const { body: incoming } = req;
    // 1- check fields required input not empty
    if (
      !incoming?.title ||
      !incoming?.description ||
      !incoming?.category?.categoryId ||
      !incoming?.price?.currency ||
      !incoming?.price?.number ||
      !incoming?.cover ||
      !incoming?.sizes?.length ||
      !Array.isArray(incoming?.sizes) ||
      !incoming?.branch
    )
      return res.status(400).json({ message: "Must fil required fields" });

    //1.1 - check the datatypes of price and quantity
    if (typeof incoming.price.number !== "number")
      return res.status(400).json({ message: "Price must be Number" });

    if (incoming.quantity) {
      if (typeof incoming.quantity !== "number")
        return res.status(400).json({ message: "quantity must be Number" });
    }

    // 1.3- check the length of description
    if (lengthOfDescriptionChecker(incoming.description, 14, 121))
      return res
        .status(400)
        .json({ message: "Description range must be (15 , 120) words" });

    try {
      // 2.1 - must the product follow specific category
      const categoryIsFound = await Category.findCategory(
        incoming.category.categoryId
      );

      if (!categoryIsFound?.name)
        return res.status(404).json({
          message: `No category found`,
        });

      // 2.2 - check the category have section if have and incoming product bot have section prevent process
      if (categoryIsFound?.sections?.length && !incoming.section) {
        return res.status(406).json({
          message: `the category ${categoryIsFound.name} have section must set section`,
        });
      }

      // 2.3 - check section of product because some category not have sections
      if (incoming?.section) {
        // 2.3.1 - find section and prevent process if not found
        const foundSection = await Category.findSection(
          categoryIsFound._id,
          incoming.section
        );

        if (!foundSection)
          return res.status(404).json({
            message: `No found section  ${incoming.section} in category ${categoryIsFound.name}`,
          });
      }

      // 3.1 - find branch and prevent process if not found
      const branchIsFound = await Category.findBranch(
        categoryIsFound._id,
        incoming.branch
      );

      if (!branchIsFound) {
        return res.status(404).json({
          message: `No branch found ${incoming.branch} for category ${categoryIsFound.name}`,
        });
      }

      // 4.1 - check for conflict name
      if (await titleIsConflictProductChecker(incoming?.title))
        return res.status(409).json({ message: "Product is already exist" });

      // 5-  data is correct and set new document
      const product = createProduct(incoming, categoryIsFound?.name);
      req.product = product;
      next();
      await ProductModel.create(product);
      return res.status(201).json({ message: "Create product successfully" });
    } catch (err) {
      return res.status(500).send();
    }
  }

  // update product method and handel http request
  static async update(req, res) {
    const { id } = req.params;
    const { body: incoming } = req;

    //1- check for felids inputs no empty
    if (
      !incoming?.title &&
      !incoming?.description &&
      !incoming?.price?.currency &&
      !incoming?.price?.number &&
      !incoming?.cover &&
      !incoming?.sizes &&
      !incoming?.branch &&
      !incoming?.company &&
      !incoming?.colors &&
      !incoming?.section &&
      !incoming?.quantity
    )
      return res
        .status(400)
        .json({ message: "No  information to update product" });

    try {
      //2- check id of product is found and get product
      const product = await ProductModel.findById(id).exec();

      //3-change Data with  specific roles for data

      if (!product)
        return res.status(400).json({ message: "No product found" });
      // 3.1 - check for no conflict title
      if (
        incoming?.title &&
        !(incoming.title === product.title.toLowerCase())
      ) {
        if (await titleIsConflictProductChecker(incoming?.title))
          return res.status(409).json({ message: "Product is already exist" });
        product.title = incoming.title.toLowerCase();
      }
      // 3.2 update description the follow roles
      if (incoming?.description) {
        if (lengthOfDescriptionChecker(incoming.description, 14, 121))
          return res
            .status(400)
            .json({ message: "Description range must be (15 , 120) words" });

        product.description = incoming.description;
      }

      // 3.3 update branch the follow roles
      if (incoming?.branch) {
        const branchIsFound = await Category.findBranch(
          product.category.categoryId,
          incoming.branch
        );

        if (!branchIsFound) {
          return res.status(404).json({
            message: `No branch ${incoming?.branch} for category ${product.category.name}`,
          });
        }

        product.branch = incoming.branch.toLowerCase();
      }

      // 3.4 update price currency the follow roles     ** maybe used **
      if (incoming?.price?.currency) {
        product.price.currency = incoming.price.currency;
      }

      // 3.5 update price number the follow roles
      if (incoming?.price?.number) {
        if (typeof incoming.price.number !== "number")
          return res.status(400).json({ message: "Price must be Number" });
        product.price.number = incoming.price.number;
      }

      // 3.6 update company the follow roles
      if (incoming?.company) {
        product.company = incoming.company;
      }

      // 3.7 update cover the follow roles
      if (incoming?.cover) {
        product.cover = incoming.cover;
      }

      // 3.8 update colors the follow roles
      if (incoming?.colors) {
        product.colors = incoming.colors;
      }

      // 3.9 update section the follow roles
      if (incoming?.section) {
        const foundSection = await Category.findSection(
          product.category.categoryId,
          incoming.section
        );

        if (!foundSection)
          return res.status(404).json({
            message: `No found section  ${incoming?.section} in category ${product.category.name}`,
          });

        product.section = incoming?.section;
      }

      // 3.10 update size the follow roles
      if (incoming?.sizes) {
        if (!Array.isArray(incoming?.sizes))
          return res
            .status(406)
            .json({ message: "sizes must be series of size" });
        product.sizes = incoming.sizes;
      }

      // 3.11 update quantity the follow roles
      if (incoming?.quantity) {
        if (typeof incoming.quantity !== "number")
          return res.status(400).json({ message: "quantity must be Number" });

        product.incoming = incoming.quantity;
      }

      await product.save();

      return res.status(200).json({ message: "Update product successfully" });
    } catch (err) {
      return res.status(500).send();
    }
  }

  // delete product method and handel http request
  static async delete(req, res) {
    const { id } = req.params;

    try {
      const product = await ProductModel.findById(id).lean().exec();
      if (!product)
        return res.status(404).json({ message: "No product found" });

      await ProductModel.deleteOne({ _id: id });

      return res.status(200).json({ message: "Delete product successfully" });
    } catch (err) {
      return res.status(500).send();
    }
  }
  // CRUD END RESTful API
}

function createProduct(incoming, name) {
  return {
    title: incoming.title.toLowerCase(),
    description: incoming.description,
    category: {
      name: name.toLowerCase(),
      categoryId: incoming.category.categoryId,
    },
    price: {
      currency: incoming.price.currency,
      number: incoming.price.number,
    },
    section: incoming.section.toLowerCase(),
    branch: incoming.branch.toLowerCase(),
    company: incoming.company,
    cover: incoming.cover,
    colors: incoming.colors,
    sizes: incoming.sizes,
    company: incoming.company,
    quantity: incoming.quantity,
  };
}
module.exports = Product;
