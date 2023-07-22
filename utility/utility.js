// const taxPayerModel = require('../models/tax-payer')
// const taxpayerController = require("../modules/taxPayer/taxPayerController");

exports.taxIncome = function (totel_income) {
  // let totel_income = users.totel_income
  // console.log(totel_income)
  // let income = taxPayerModel.income
  // totel_income = taxPayerModel.totel_income
  if (totel_income <= 500000) {
    return (tax = (totel_income * 2.5) / 100); // tax is 2.5% of income
  } else if (totel_income <= 750000) {
    return (tax = (totel_income * 5) / 100); // tax is 5% of income
  } else if (totel_income <= 1000000) {
    return (tax = (totel_income * 7.5) / 100); // tax is 7.5% of income
  } else if (totel_income <= 1250000) {
    return (tax = (totel_income * 10) / 100); // tax is 10% of income
  } else if (totel_income <= 1500000) {
    return (tax = (totel_income * 12.5) / 100); // tax is 12.5% of income
  } else if (totel_income > 1500000) {
    return (tax = (totel_income * 15) / 100); // tax is 15% of income
  } else {
    res.status(400).json({
      message: "Invalid Credentials",
    });
  }
};
