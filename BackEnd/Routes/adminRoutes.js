const express = require("express");
const { loginAdmin } = require("../Controller/adminCtrl");
const adminRouter = express.Router();


adminRouter.post("/login", loginAdmin),

module.exports = adminRouter;