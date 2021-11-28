const Password = require("../utils/password");

const encrypt = async (req, next) => {
  const { password = null } = req.body;

  if (!password) {
    // senha não informada
  }

  const hash = await Password.encrypt(password);
//   ctx.state.hash = hash;
  return next();
};

module.exports = { encrypt };