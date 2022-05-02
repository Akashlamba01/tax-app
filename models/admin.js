var mongoose = require('mongoose');
var adminSchema = mongoose.Schema({
    access_token: {
        type: String,
        require: true
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    mobile_number: {
        type: String
    }
})

var Admin = mongoose.model('Admin', adminSchema)

Admin.findOne({}).then((res)=>{
    if(!res)
        Admin.create({
            email: 'admin@gmail.com',
            password: '25d55ad283aa400af464c76d713c07ad'
        })
})

exports.AdminModel = Admin
const adminModel = mongoose.model('admin', adminSchema)
module.exports = adminModel


