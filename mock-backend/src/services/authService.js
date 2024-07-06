const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign({ scope: "ROLE_ADMIN", ...payload }, "jwt-secret", {
    expiresIn: "10m",
  });
};

const signUp = async (payload) => {
  return {
    token: generateToken(payload),
  };
};

const signIn = async (payload) => {
  return {
    token: generateToken(payload),
  };
};

module.exports = { signUp, signIn };
