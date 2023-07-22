const incomeTaxGenrate = (totel_income) => {
  // console.log(totel_income);
  if (totel_income <= 300000) {
    return 0;
  } else if (totel_income <= 500000) {
    return (totel_income * 2.5) / 100; // tax is 2.5% of income
  } else if (totel_income <= 750000) {
    return (totel_income * 5) / 100; // tax is 5% of income
  } else if (totel_income <= 1000000) {
    return (totel_income * 7.5) / 100; // tax is 7.5% of income
  } else if (totel_income <= 1250000) {
    return (totel_income * 10) / 100; // tax is 10% of income
  } else if (totel_income <= 1500000) {
    return (totel_income * 12.5) / 100; // tax is 12.5% of income
  } else if (totel_income > 1500000) {
    return (totel_income * 15) / 100; // tax is 15% of income
  } else {
    return 0;
  }
};

module.exports = incomeTaxGenrate;
