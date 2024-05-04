const CategoryModel = require("../model/CategoryModel");
const ProductModel = require("../model/ProductModel");

function lengthOfDescriptionChecker(description, min, max) {
  if (!(min < description.length) || !(description.length < max)) return true;
  return false;
}

async function nameIsConflictCategoryChecker(name) {
  const nameIsConflict = await CategoryModel.findOne({
    name: name?.toLowerCase(),
  })
    .lean()
    .exec();

  if (nameIsConflict) return true;
  return false;
}

async function titleIsConflictProductChecker(title) {
  const nameIsConflictProduct = await ProductModel.findOne({
    title: title.toLowerCase(),
  })
    .lean()
    .exec();

  if (nameIsConflictProduct) return true;
  return false;
}
module.exports = {
  lengthOfDescriptionChecker,
  titleIsConflictProductChecker,
  nameIsConflictCategoryChecker,
};
