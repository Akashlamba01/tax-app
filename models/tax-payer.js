var mongoose = require('mongoose');
var taxPayerSchema = mongoose.Schema({
    access_token: {
        type: String
    },
    full_name: {
        type: String,
        default: ""
    },
    username: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    pan: {
        type: String,
        default: ""
    },
    mobile_number: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        enum: ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pardesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "Gairsain", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra & Nagar Haveli and Daman & Diu", "Dehli", "Jammu and Kashmir", "Lakshadweep", "Puducherry", "Ladakh"],
        default: ""
    }, 
    gender: {
        type: String,
        enum: ["MALE", "FEMALE", "OTHERS"]
    },
    city: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    income: {
        type: Number,
        default: ""
    },
    share_market_income: {
        type: Number,
        default: ""
    },
    totel_income: {
        type: Number,
        default: ""
    },
    totel_tax: {
        type: Number,

    },
    tax_due: {
        type: Number,
        default: ""
    },
    date: {
        type: String,
        default: "1st Apr 2022 to 31st Mar 2023"
    }
})

var taxPayerModel = new mongoose.model('Tax-Payer', taxPayerSchema)
module.exports = taxPayerModel