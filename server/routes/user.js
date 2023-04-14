const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/user");
const { authenticateToken } = require("../middlewares/auth");

router.get("/", authenticateToken, getAllUsers);

module.exports = router;
