const express = require("express");
const { getAllUsers } = require("../controllers/usersController");

const router = express.Router();

router.get("/management/users", getAllUsers);

module.exports = router;
