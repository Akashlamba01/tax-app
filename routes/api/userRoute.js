const express = require("express");
const router = express.Router();
const {
  signUp,
  login,
  logout,
  changePassword,
} = require("../../controller/userController");
const { verifyToken } = require("../../config/middleware");
const { celebrate, Joi } = require("celebrate");

router.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      full_name: Joi.string().required(),
      email: Joi.string().email().lowercase().required(),
      username: Joi.string().optional(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]{6,16}$"))
        .required(),
      confirm_password: Joi.ref("password"),
      mobile_number: Joi.string().optional(),
      state: Joi.string().required(),
      pan: Joi.string()
        .min(6)
        .pattern(new RegExp("^[A-Z]{5}[0-9]{4}[A-Z]{1}$"))
        .required(),
      city: Joi.string().required(),
      address: Joi.string().min(10).max(30).required(),
      gender: Joi.string().required(),
      // totel_income: Joi.number().required(),
      income: Joi.number().required(),
      share_market_income: Joi.number().optional(),
    }),
  }),
  signUp
);

router.post(
  "/login",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().required(),
    }),
  }),
  login
);
router.post("/logout", verifyToken, logout);

router.post(
  "/changePassword",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().lowercase().required(),
      oldPassword: Joi.string().required(),
      newPassword: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*]{6,16}$"))
        .required()
        .min(8),
    }),
  }),
  verifyToken,
  changePassword
);

module.exports = router;
