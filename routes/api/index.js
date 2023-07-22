const express = require("express");
const router = express.Router();
const userRoute = require("./userRoute");
const adminRoute = require("./adminRoute");

router.use("/admin", adminRoute);
router.use("/user", userRoute);

module.exports = router;
