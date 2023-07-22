const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    access_token: {
      type: String,
      require: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
    },
    mobile_number: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

Admin.findOne({}).then((res) => {
  if (!res)
    Admin.create({
      email: "admin@gmail.com",
      password: "4de93544234adffbb681ed60ffcfb941", //Admin@1234
    });
});

exports.AdminModel = Admin;
const adminModel = mongoose.model("Admin", adminSchema);
module.exports = adminModel;
