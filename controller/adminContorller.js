const Admin = require("../models/admin");
const User = require("../models/user");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    // console.log(md5("Admin@1234"));

    if (!admin || admin.password != md5(req.body.password)) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        email: req.body.email,
      },
      "supersecret",
      { expiresIn: "30d" }
    );

    const update = await Admin.findOneAndUpdate(
      {
        email: req.body.email,
      },
      {
        $set: {
          access_token: token,
        },
      },
      {
        new: true,
      }
    );

    console.log(update);
    // delete update._doc.password;

    return res.status(200).json({
      message: "Loged Succesfully",
      data: update,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};

exports.logout = async function (req, res, next) {
  // console.log("HERE");
  try {
    console.log("User::", req.adminData);
    let userId = req.adminData.id;

    let data = await Admin.findByIdAndUpdate(
      userId,
      {
        $set: {
          access_token: null,
        },
      },
      {
        new: true,
      }
    );

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "something was wrong! Try again letter",
      });
    }

    return res.status(200).json({
      message: "loged out successfully....",
      // data: data,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    let { oldPassword, newPassword, email } = req.body;
    // console.log(req.adminId);

    if (oldPassword == newPassword) {
      return res.status(400).json({
        message: "You can not use Old Password!",
      });
    }

    // let adminId = req.adminData.id;

    let admin = await Admin.findById(req.adminData.id);
    console.log(admin);
    // console.log(admin.password == md5(oldPassword));

    if (admin && admin.password == md5(oldPassword)) {
      let access_token = jwt.sign(
        {
          email: email,
        },
        "supersecret",
        {
          expiresIn: "30d",
        }
      );

      let isUpdated = await Admin.findOneAndUpdate(
        { email },
        {
          password: md5(newPassword),
          access_token: access_token,
        },
        { new: true }
      )
        .then((updated) => {
          return res.status(200).json({
            data: updated,
            success: true,
            message: "Password Changed Successfully!",
          });
        })
        .catch((e) => {
          return res.status(400).json({
            message: "Sothing wrong!",
            success: false,
          });
        });
    } else {
      return res.status(400).json({
        success: false,
        message: "invalid details!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

exports.getUserData = async (req, res) => {
  try {
    // userId = req.adminData.id;
    userData = await User.findById(req.params.id);

    if (!userData) {
      return res.status(400).json({
        success: false,
        message: "invalid details",
      });
    }

    return res.status(200).json({
      success: true,
      message: "get user successfully",
      data: userData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserList = async function (req, res) {
  try {
    let list = await User.find({});

    if (!list) {
      return res.status(400).json({
        message: "no list available",
      });
    }

    return res.status(200).json({
      data: list,
      message: "List got successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
