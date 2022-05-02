var adminModel = require('../../models/admin')
var md5 = require('md5')
var jwt = require('jsonwebtoken')
var Joi = require('joi')
var taxPayerModel = require('../../models/tax-payer')
const { findByIdAndDelete, findByIdAndUpdate } = require('../../models/admin')
const { is } = require('express/lib/request')

exports.login = async function (req, res) {
    var {
        email,
        password
    } = req.body

    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(6).required()
    })

    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    }

    const {
        error,
        value
    } = schema.validate(req.body, options)

    if (error)
        return res.status(400).json({
            message: `Validation error: ${error.details[0].message}`
        })

    var adminData = req.body
    adminData.email = adminData.email.toLowerCase()

    
    
    try {
        
        var admin = await adminModel.findOne({
            email: adminData.email,
            password: md5(adminData.password)
        })
        
        console.log("A::::::, ", adminData, "llll:::::::::", md5(req.body.password));
        
        if (!admin)
        return res.status(400).json({
            message: 'Invalid Credentials'
        })
        
        var token = jwt.sign({
            email: req.body.email
        }, 'supersecret')

        var update = await adminModel.findOneAndUpdate({
            email: adminData.email
        }, {
            $set: {
                access_token: token
            }
        }, {
            new: true
        })

        delete update._doc.password

        return res.status(400).json({
            data: update,
            message: 'Login Succesfully'
        })

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}


exports.logout = async function (req, res, next) {
    console.log("HERE");
    try {
        let userId = req.body._id
        console.log('User::', userId);

        let data = await adminModel.findByIdAndUpdate(userId, {
            $set: {
                access_token: null
            }
        }, {
            new: true
        })

        if (!data)
            return res.status(400).json({
                message: 'something was wrong! Try again letter'
            })


        return res.status(200).json({
            data: data,
            message: 'loged out successfully....'
        })

    } catch (e) {
        return res.status(400).json({
            message: e.message
        })
    }
}


exports.changePassword = async (req, res) => {
    try {

        let {
            oldPassword,
            newPassword,
            email
        } = req.body

        if(!oldPassword) 
            return res.status(400).json({
                message: 'Old Password is Missing'
            })
        
        if(!newPassword)    
            return res.status(400).json({
                message: 'New Password is Missing'
            })

        if(oldPassword == newPassword)
            return res.status(400).json({
                message: 'Password is Matching'
            })
        
        let admin = await adminModel.findOne({
            email: req.body.email
        })    

        if(!admin)
            return res.status(400).json({
                message: 'email not found'
            })
         
        if(admin.password == md5(oldPassword)){
            
            var isUpdated = await adminModel.findByIdAndUpdate({
                _id: admin.id
            }, {
                password: md5(newPassword)
            })
            delete isUpdated._doc.password
    
            return res.status(200).json({
                data: isUpdated,
                message: 'Password Changed Successfully'
            })
        } else {
            return res.status(400).json({
                message: 'Invalid Password'
            })
        }
          
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}


exports.taxPayersList = async function (req, res) {
    try {
        var list = await taxPayerModel.find({})

        if (!list)
            return res.status(400).json({
                message: 'no list available'
            })

        return res.status(200).json({
            data: list,
            message: 'List got successfully'
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}


exports.views = async (req, res) => {
    try {
        
        userId = req.body._id
        userData = await taxPayerModel.findById(userId)

        if(!userData)
            return res.status(400).json({
                message: 'invalid details'
            })

        return res.status(200).json({
            data: userData,
            message: 'views successfully'
        })    

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}