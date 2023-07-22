const router = require("express").Router();
const {
  login,
  logout,
  changePassword,
  getUserData,
  getUserList,
} = require("../../controller/adminContorller");
const { adminVerifyToken } = require("../../config/middleware");
const { celebrate, Joi } = require("celebrate");

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

router.post("/logout", adminVerifyToken, logout);

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
  adminVerifyToken,
  changePassword
);

router.get("/get-user/:id", adminVerifyToken, getUserData);

router.get("/user-list", adminVerifyToken, getUserList);

module.exports = router;
