const APIError = require("../error/APIError");
const authService = require("../services/authService");
const wait = require('../utils/wait')

const signUp = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, triggerStatus } = req.body;

    // simulate longer request to real server
    await wait(1000);

    if (triggerStatus === 400) {
      return next(APIError.BadRequest());
    }

    if (triggerStatus === 401) {
      return next(APIError.Unauthorized());
    }

    const payload = { email, password, firstName, lastName };
    const userDetails = await authService.signUp(payload);
    res.json(userDetails);
  } catch (error) {
    next(error);
  }
};
const signIn = async (req, res, next) => {
  try {
    const { email, password, triggerStatus } = req.body;

    // simulate longer request to real server
    await wait(1000);

    if (triggerStatus === 400) {
      return next(APIError.BadRequest());
    }

    if (triggerStatus === 409) {
      return next(APIError.Conflict());
    }

    const payload = { email, password };
    const userDetails = await authService.signIn(payload);
    res.json(userDetails);
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, signIn };
