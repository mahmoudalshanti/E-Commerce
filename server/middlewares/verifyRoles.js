const verifyRoles = (roles) => {
  return (req, res, next) => {
    const roleOfUser = req.role;
    console.log(roles, roleOfUser);
    const verifyRole = roles.map((role) => {
      if (Number(roleOfUser) === role) return true;
    });
    const roleCheck = verifyRole.find((role) => role === true);
    if (!roleCheck) return res.status(403).json({ message: "Forbidden" });
    next();
  };
};

module.exports = verifyRoles;
