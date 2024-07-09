const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  let role = "ROLE_USER";

  if (payload.email.startsWith("admin")) {
    role = "ROLE_ADMIN";
  } else if (payload.email.startsWith("shopmanager")) {
    role = "ROLE_MANAGER";
  }

  return jwt.sign({ scope: role, ...payload }, "jwt-secret", {
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
