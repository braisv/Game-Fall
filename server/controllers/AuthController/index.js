const { getCurrentUser } = require("./getCurrentUser");
const { login } = require("./login");
const { logout } = require("./logout");
const { register } = require("./register");

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
};
