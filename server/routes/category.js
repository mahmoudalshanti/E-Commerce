const Category = require("../classes/Category");
const verifyRoles = require("../middlewares/verifyRoles");
const router = require("express").Router();
const ROLES = require("../config/roles");

router.get("/", Category.getAll);

router.post("/", verifyRoles([ROLES.SuperAdmin, ROLES.Admin]), Category.create);
router.post(
  "/section/:id",
  verifyRoles([ROLES.SuperAdmin, ROLES.Admin]),
  Category.createSection
);
router.post(
  "/branch/:id",
  verifyRoles([ROLES.SuperAdmin, ROLES.Admin]),
  Category.createBranch
);

router.patch(
  "/name/:id",
  verifyRoles([ROLES.SuperAdmin, ROLES.Admin, ROLES.Editor]),
  Category.updateName
);
router.patch(
  "/desc/:id",
  verifyRoles([ROLES.SuperAdmin, ROLES.Admin, ROLES.Editor]),
  Category.updateDescription
);
router.patch(
  "/section/:id",
  verifyRoles([ROLES.SuperAdmin, ROLES.Admin, ROLES.Editor]),
  Category.updateSection
);
router.patch(
  "/branch/:id",
  verifyRoles([ROLES.SuperAdmin, ROLES.Admin, ROLES.Editor]),
  Category.updateBranch
);

router.delete(
  "/:id",
  verifyRoles([ROLES.SuperAdmin, ROLES.Admin]),
  Category.delete
);

router.delete(
  "/section/:id",
  verifyRoles([ROLES.SuperAdmin, ROLES.Admin]),
  Category.deleteSection
);

router.delete(
  "/branch/:id",
  verifyRoles([ROLES.SuperAdmin, ROLES.Admin]),
  Category.deleteBranch
);

module.exports = router;
