const { json } = require("stream/consumers");
const {
  lengthOfDescriptionChecker,
  nameIsConflictCategoryChecker,
} = require("../functions/checker-functions");

const CategoryModel = require("../model/CategoryModel");
const ProductModel = require("../model/ProductModel");
const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const currentDate = require("../functions/date-function");

class Category {
  constructor() {
    console.log("Category Class, Controller");
  }

  // find category Method
  static async findCategory(id) {
    const categoryIsFound = await CategoryModel.findById(id).exec();
    return categoryIsFound;
  }

  // find category by name Method

  static async findCategoryByName(name) {
    const categoryIsFound = await CategoryModel.findOne({
      name: name.toLowerCase().trim(),
    }).lean();
    return categoryIsFound;
  }

  static async findSection(id, incomingSection) {
    const category = await Category.findCategory(id);

    if (!category) return false;

    const foundSection = category.sections.find(
      (section) => section === incomingSection.toLowerCase().trim()
    );
    console.log(foundSection, incomingSection);
    return foundSection;
  }

  // find branch Method
  static async findBranch(id, incomingBranch) {
    const categoryIsFound = await Category.findCategory(id);
    if (!categoryIsFound) return false;

    const branchIsFound = categoryIsFound.branches.find(
      (branch) => branch === incomingBranch.toLowerCase().trim()
    );

    return branchIsFound;
  }

  //get all Categories Method and handel http request
  static async getAll(req, res) {
    try {
      const categories = await CategoryModel.find({}).lean();

      return res.status(200).json({ categories: categories });
    } catch (err) {
      return res.status(500).send();
    }
  }

  // add Category Method and handel http request
  static async create(req, res) {
    // 1- check of length of category must be lower than 6
    const lengthOfDocuments = await CategoryModel.countDocuments().exec();

    if (!(lengthOfDocuments < 5)) {
      return res.status(406).json({
        message:
          "You have exceeded the number of category and the number of sections allowed is less than six",
      });
    }

    // 2- check  required inputs filed not empty
    const { name, description, sections, branches } = req.body;
    if (!name || !description || !branches?.length || !Array.isArray(branches))
      return res.status(400).json({ message: "fill felids  required" });

    // 3- check the length of description
    if (lengthOfDescriptionChecker(description, 14, 501))
      return res
        .status(400)
        .json({ message: "Description range must be (15 , 500) words" });

    try {
      // 4- check conflict category in tue prevent processes
      if (await nameIsConflictCategoryChecker(name))
        return res.status(409).json({
          message: `Already have category with name ${name.toLowerCase()} `,
        });

      // const findConflict = sections.re;

      const sectionsObj = sections.map((section) => {
        return {
          name: section ? section.toLowerCase().trim() : [],
          products: 0,
          createdAt: currentDate(),
          lastUpdate: currentDate(),
          category: name,
        };
      });

      const branchesObj = branches.map((branches) => {
        return {
          name: branches ? branches.toLowerCase().trim() : [],
          products: 0,
          createdAt: currentDate(),
          lastUpdate: currentDate(),
          category: name,
        };
      });

      // 5-  data is correct and set new document
      const category = {
        name: name.toLowerCase().trim(),
        description,
        sections: sectionsObj,
        branches: branchesObj,
      };

      await CategoryModel.create(category);
      const categories = await CategoryModel.find({}).lean();
      return res.status(201).json({
        message: "Create category successfully",
        categories: categories,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  }

  //delete category Method and handel http request
  static async delete(req, res) {
    const { id } = req.params;
    const { password, userId } = req.query;
    // important when delete category all product has same name of category deleted
    try {
      if (!password || !userId)
        return res.status(400).json({ message: "No password set" });
      const user = await UserModel.findById(userId).lean();
      if (!user) return res.status(404).json({ message: "No user found" });

      const comparePwd = await bcrypt.compare(password, user.password);
      if (!comparePwd)
        return res.status(406).json({ message: "Password not correct" });

      const categoryIsFound = await CategoryModel.findById(id).lean().exec();
      if (!categoryIsFound)
        return res.status(404).json({ message: "No category found" });

      const getProductsHaveSameCategoryName = await ProductModel.find({
        "category.name": categoryIsFound.name,
      });

      await ProductModel.deleteMany({
        _id: { $in: getProductsHaveSameCategoryName },
      });
      await CategoryModel.deleteOne({ _id: id });

      return res.status(200).json({ message: "Delete category successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  }

  // update name and handel http request
  static async updateName(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "No name to update" });

    try {
      const category = await Category.findCategory(id);
      if (!category)
        return res.status(404).json({ message: "No category found" });

      if (await nameIsConflictCategoryChecker(name))
        return res.status(409).json({
          message: `Already have category with name ${name.toLowerCase()}`,
        });

      await ProductModel.updateMany(
        { "category.name": category.name },
        { $set: { "category.name": name } }
      );

      category.name = name;
      await category.save();
      return res
        .status(200)
        .json({ message: "Update name category successfully", name: name });
    } catch (err) {
      return res.status(500).send();
    }
  }

  // update description and handel http request
  static async updateDescription(req, res) {
    const { id } = req.params;
    const { description } = req.body;

    if (!description)
      return res.status(400).json({ message: "No description to update" });

    if (lengthOfDescriptionChecker(description, 14, 501))
      return res
        .status(400)
        .json({ message: "Description range must be (15 , 500) words" });

    try {
      const category = await Category.findCategory(id);
      if (!category)
        return res.status(404).json({ message: "No category found" });

      category.description = description;
      await category.save();
      return res.status(200).json({
        message: "Update description successfully",
        description: description,
      });
    } catch (err) {
      return res.status(500).send();
    }
  }

  // create section and handel http request
  static async createSection(req, res) {
    const { id } = req.params;
    const { section } = req.body;
    if (!section)
      return res.status(400).json({ message: "No section to create" });

    try {
      const category = await Category.findCategory(id);
      if (!category)
        return res.status(404).json({ message: "No category found" });

      const foundSection = category.sections.find(
        (sectionParm) =>
          sectionParm.name.toLowerCase() === section.toLowerCase()
      );

      if (foundSection)
        return res
          .status(409)
          .json({ message: `Already have section ${section}` });

      const sectionObj = {
        name: section,
        products: 0,
        createdAt: currentDate(),
        lastUpdate: currentDate(),
        category: category.name,
      };

      category.sections.push(sectionObj);
      await category.save();

      return res
        .status(201)
        .json({ message: "New section create", section: sectionObj });
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  }
  // create branch and handel http request
  static async createBranch(req, res) {
    const { id } = req.params;
    const { branch } = req.body;

    if (!branch)
      return res.status(400).json({ message: "No branch to create" });
    try {
      const category = await Category.findCategory(id);
      if (!category)
        return res.status(404).json({ message: "No category found" });

      const foundBranch = category.branches.find(
        (branchParam) => branchParam.toLowerCase() === branch.toLowerCase()
      );

      if (foundBranch)
        return res
          .status(409)
          .json({ message: `Already have branch ${branch}` });

      category.branches.push(branch);
      await category.save();

      return res.status(201).json({ message: "New branch created" });
    } catch (err) {
      return res.status(500).send();
    }
  }

  // delete section and handel http request
  static async deleteSection(req, res) {
    const { id } = req.params;
    const { section: incomingSection } = req.body;

    // important when delete section all product has same name of category deleted
    try {
      const category = await Category.findCategory(id);
      if (!category)
        return res.status(404).json({ message: `No category found` });

      const section = await Category.findSection(id, incomingSection);

      if (!section)
        return res.status(404).json({
          message: `No section found with name ${incomingSection.toLowerCase()}`,
        });

      const removeSectionFromSections = category.sections.filter(
        (section) => section.toLowerCase() !== incomingSection.toLowerCase()
      );

      category.sections = removeSectionFromSections;

      await ProductModel.deleteMany({ section: incomingSection.toLowerCase() });
      await category.save();

      return res.status(200).json({ message: "delete section successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).send();
    }
  }

  // delete branch and handel http request
  static async deleteBranch(req, res) {
    const { id } = req.params;
    const { branch: incomingBranch } = req.body;

    try {
      const category = await Category.findCategory(id);
      if (!category)
        return res.status(404).json({ message: `No category found` });

      const branch = await Category.findBranch(id, incomingBranch);

      if (!branch)
        return res.status(404).json({
          message: `No branch found with name ${incomingBranch.toLowerCase()}`,
        });

      const removeBranchFromBranches = category.branches.filter(
        (branch) => branch.toLowerCase() !== incomingBranch.toLowerCase()
      );

      category.branches = removeBranchFromBranches;

      await ProductModel.deleteMany({ branch: incomingBranch.toLowerCase() });
      await category.save();

      return res.status(200).json({ message: "Delete  branch successfully" });
    } catch (err) {
      return res.status(500).send();
    }
  }
  // delete branch and handel http request

  // update section and handel http request
  static async updateSection(req, res) {
    const { id } = req.params;
    const { name, oldName } = req.body;
    if (!name) return res.status(400).json({ message: "No section to update" });

    try {
      const category = await Category.findCategory(id);
      if (!category)
        return res.status(404).json({ message: "No category found" });

      const sectionExist = category.sections.find(
        (section) => section?.name?.toLowerCase() === name.toLowerCase()
      );

      if (sectionExist)
        return res.status(409).json({ message: "section already exist" });

      const section = category.sections.find(
        (section) => section?.name?.toLowerCase() === oldName.toLowerCase()
      );

      if (!section)
        return res.status(404).json({ message: "No section found" });

      const reSection = category.sections.filter(
        (section) => section.name.toLowerCase() !== oldName.toLowerCase()
      );

      
    category.sections = [...reSection , {name : name , currentDate}]

      // set new section for products have old section

      await ProductModel.updateMany(
        { section: oldName },
        { $set: { section: name.toLowerCase() } }
      );

      await category.save();
      return res.status(200).json({ message: "Update section successfully" });
    } catch (err) {
      return res.status(500).send;
    }
  }

  // update branch and handel http request
  static async updateBranch(req, res) {
    const { id } = req.params;
    const { oldBranch, newBranch } = req.body;
    if (!oldBranch || !newBranch)
      return res.status(400).json({ message: "No branch to update" });

    try {
      const category = await Category.findCategory(id);

      if (!category)
        return res.status(404).json({ message: "No category found" });

      // verify for oldest branch are exist
      const verifyBranch = category.branches.find(
        (branch) => branch.toLowerCase() === oldBranch.toLowerCase()
      );

      if (!verifyBranch)
        return res.status(406).json({
          message: `${oldBranch.toLowerCase()} not found in branches of ${
            category.name
          }`,
        });

      // remove old branch and set new branch
      const reBranches = category.branches.filter(
        (oldBranch) => oldBranch !== verifyBranch
      );

      reBranches.push(newBranch);

      category.branches = reBranches;

      // set new branch for products have old branch
      await ProductModel.updateMany(
        { branch: oldBranch },
        { $set: { branch: newBranch } }
      );

      await category.save();
      return res.status(200).json({ message: "Update branch successfully" });
    } catch (err) {
      return res.status(500).send();
    }
  }
}

module.exports = Category;
