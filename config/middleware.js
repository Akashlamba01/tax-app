const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Admin = require("../models/admin");

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.header("access_token");

    if (!token) {
      return res.status(401).json({
        message: "No token provided!",
        auth: false,
        success: false,
      });
    }

    jwt.verify(token, "supersecret", async (err, decode) => {
      if (err) {
        return res.status(401).json({
          message: "token is not valid!",
          success: false,
        });
      }

      const user = await User.findOne({ access_token: token });

      if (!user) {
        return res.status(401).json({
          message: "unauthorized!",
          auth: false,
          success: false,
        });
      }

      req.userData = user;
      // console.log(user);
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "unauthorized!",
      auth: false,
      success: false,
    });
  }
};

exports.adminVerifyToken = async (req, res, next) => {
  try {
    const token = req.header("access_token");

    if (!token) {
      return res.status(401).json({
        message: "No token provided!",
        auth: false,
        success: false,
      });
    }

    jwt.verify(token, "supersecret", async (err, decode) => {
      if (err) {
        return res.status(401).json({
          message: "token is not valid!",
          success: false,
        });
      }

      const admin = await Admin.findOne({ access_token: token });

      if (!admin) {
        return res.status(401).json({
          message: "unauthorized!",
          auth: false,
          success: false,
        });
      }

      req.adminData = admin;
      // console.log(admin);
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "unauthorized!",
      auth: false,
      success: false,
    });
  }
};
