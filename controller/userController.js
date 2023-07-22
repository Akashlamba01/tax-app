const User = require("../models/user");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const { taxIncome } = require("../utility/utility");
const incomeTaxGenrate = require("../utility/taxMiddleware");

exports.signUp = async function (req, res) {
  try {
    // req.body.email = req.body.email.toLowerCase();
    let isExists = await User.findOne({
      $or: [
        {
          email: req.body.email,
        },
        {
          mobile_number: req.body.mobile_number,
        },
      ],
    });
    if (isExists) {
      return res.status(400).json({
        sccess: false,
        message: "Email Or Phone Number Already Exists",
      });
    }

    req.body.access_token = jwt.sign({ email: req.body.email }, "supersecret", {
      expiresIn: "30d",
    });
    req.body.password = md5(req.body.password);

    let state = req.body.state;
    let totel_income = req.body.share_market_income + req.body.income;

    var user = await User.create(req.body);

    let taxPyament;
    if (
      state == "Delhi" ||
      state == "Andaman and Nicobar Islands" ||
      state == "Chandigarh" ||
      state == "Dadra & Nagar Haveli and Daman & Diu" ||
      state == "Jammu and Kashmir" ||
      state == "Lakshadweep" ||
      state == "Puducherry" ||
      state == "Ladakh"
    ) {
      taxPyament = incomeTaxGenrate(totel_income);
    } else {
      taxPyament = 2 * incomeTaxGenrate(totel_income);
    }

    user = await User.findByIdAndUpdate(
      user._id,
      {
        totel_income: totel_income,
        totel_tax: taxPyament,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      message: "Successfully Signed Up",
      success: true,
      data: user,
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
      success: false,
    });
  }
};

exports.login = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    // console.log(payers.income);

    console.log(user.password == md5(password));

    if (!user || user.password != md5(password)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    let token = jwt.sign({ email }, "supersecret", { expiresIn: "30d" });

    // let totel_tax = payers._doc.email

    var update = await User.findOneAndUpdate(
      {
        email,
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

    return res.status(200).json({
      message: "Succesfully login",
      success: true,
      data: update,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logout = async function (req, res) {
  // console.log("HERE");
  try {
    let userId = req.userData.id;
    // console.log("User::", userId);

    let data = await User.findByIdAndUpdate(
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

    if (!data)
      return res.status(400).json({
        sccess: false,
        message: "something was wrong! Try again letter",
      });

    return res.status(200).json({
      message: "loged out successfully....",
      success: true,
      data: data,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      success: false,
      message: "somethin was wrong!",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    let { oldPassword, newPassword, email } = req.body;
    // console.log(req.userId);

    if (oldPassword == newPassword) {
      return res.status(400).json({
        success: false,
        message: "You can not use Old Password!",
      });
    }

    let user = await User.findById(req.userData);
    console.log(user);

    if (user && user.password == md5(oldPassword)) {
      let access_token = jwt.sign(
        {
          email,
        },
        "supersecret",
        {
          expiresIn: "30d",
        }
      );

      let isUpdated = await User.findOneAndUpdate(
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
