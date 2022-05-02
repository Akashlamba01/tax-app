const taxPayerModel = require('../../models/tax-payer')
var md5 = require('md5')
var joi = require('joi')
var jwt = require('jsonwebtoken')
// var utility = require('../../common/utility')


exports.signUp = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    let {
        full_name,
        email,
        username,
        password,
        mobile_number,
        state,
        pan,
        city,
        address,
        gender,
        totel_income,
        income,
        share_market_income
    } = req.body

    const schema = joi.object({
        full_name: joi.string().required(),
        username: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
        mobile_number: joi.string().required(),
        pan: joi.string().required(),
        share_market_income: joi.number().required(),
        gender: joi.string().required(),
        state: joi.string().required(),
        city: joi.string().required(),
        income: joi.number().required(),
        address: joi.string().max(50)

    });


    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    // validate request body against schema
    const {
        error,
        value
    } = schema.validate(req.body, options);

    if (error) {
        return res.status(400).json({
            message: `Validation error: ${error.details[0].message}`
        });
    }

    let taxPayerData = req.body;
    taxPayerData.email = taxPayerData.email.toLowerCase();

    taxPayerData.password = md5(taxPayerData.password)

    var token = jwt.sign({
        email: taxPayerData.email
    }, 'supersecret');
    taxPayerData.access_token = token


    try {
        let isExists = await taxPayerModel.findOne({
            $or: [{
                email: taxPayerData.email
            }, {
                mobile_number: taxPayerData.mobile_number
            }]
        });
        if (isExists) {
            return res.status(400).json({
                message: "Email Or Phone Number Already Exists"
            });
        }


        var users = await taxPayerModel.create(taxPayerData)

        let state = users.state
        let totel_income = users.share_market_income + users.income

        // console.log(state);
        // console.log(totel_income)

        function taxInocme() {
            
            // let totel_income = users.totel_income
            console.log(totel_income)
            if (totel_income <= 500000) {
                return tax = (totel_income * 2.5) / 100  // tax is 2.5% of income
        
            } else if (totel_income <= 750000) {
                return tax = (totel_income * 5) / 100  // tax is 5% of income
        
            } else if (totel_income <= 1000000) {
                return tax = (totel_income * 7.5) / 100   // tax is 7.5% of income
        
            } else if (totel_income <= 1250000) {
                return tax = (totel_income * 10) / 100   // tax is 10% of income
        
            } else if (totel_income <= 1500000) {
                return tax = (totel_income * 12.5) / 100   // tax is 12.5% of income
        
            } else if (totel_income > 1500000) {
                return tax = (totel_income * 15) / 100   // tax is 15% of income
        
            } else {
                res.status(400).json({
                    message: 'Invalid Credentials'
                })
            }
        }


        if(state == "Dehli"){
            taxInocme()
        } else if (state == "Andaman and Nicobar Islands"){
            taxInocme()
        }else if (state == "Chandigarh"){
            taxInocme()
        }else if (state == "Dadra & Nagar Haveli and Daman & Diu"){
            taxInocme()
        }else if (state == "Jammu and Kashmir"){
            taxInocme()
        }else if (state == "Lakshadweep"){
            taxInocme()
        }else if (state == "Puducherry"){
            taxInocme()
        }else if (state == "Ladakh"){
            taxInocme()
        }else if(state){
            
            if (totel_income <= 500000) {
                tax = (totel_income * 5) / 100  // tax is 5% of income

            } else if (totel_income <= 750000) {
                tax = (totel_income * 10) / 100  // tax is 10% of income

            } else if (totel_income <= 1000000) {
                tax = (totel_income * 15) / 100   // tax is 15% of income

            } else if (totel_income <= 1250000) {
                tax = (totel_income * 20) / 100   // tax is 20% of income

            } else if (totel_income <= 1500000) {
                tax = (totel_income * 25) / 100   // tax is 25% of income

            } else if (totel_income > 1500000) {
                tax = (totel_income * 30) / 100   // tax is 30% of income

            } else {
                res.status(400).json({
                    message: 'Invalid Credentials'
                })
            }

        } else {
            res.status(400).json({
                message: "its wrong way"
            })
        }


        // console.log(tax)
        // totel_income = users.share_market_income + users.income

        users = await taxPayerModel.findByIdAndUpdate(users._id, {
            totel_income: totel_income,
            totel_tax: tax
        }, {
            new: true
        })

        delete users._doc.password

        return res.status(200).json({
            data: users,
            message: "Successfully Signed Up"
        });
    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
}


exports.login = async function (req, res, next) {
    let {
        email,
        password
    } = req.body

    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    })

    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    }

    const { error, value } = schema.validate(req.body, options)

    if (error) {
        return res.status(400).json({
            message: `Validation error: ${error.details[0].message}`
        })
    }

    var taxPayerData = req.body
    taxPayerData.email = taxPayerData.email.toLowerCase()
    

    try {

        let payers = await taxPayerModel.findOne({
            email: taxPayerData.email,
            password: md5(taxPayerData.password)
        }, {
            new: true
        }).lean()

        console.log(payers.income);

        if (!payers)
            return res.status(400).json({
                message: 'Invalid Credentials'
            })


        let token = jwt.sign({
            email: req.body.email
        }, 'supersecret')

        // let totel_tax = payers._doc.email

        var update = await taxPayerModel.findOneAndUpdate({
            email: taxPayerData.email,

        }, {
            $set: {
                access_token: token
            }
        }, {
            new: true
        })

        delete update._doc.password

        return res.status(200).json({
            data: update,
            message: 'Succesfully login'
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

        let data = await taxPayerModel.findByIdAndUpdate(userId, {
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
            message: 'somethin was wrong!'
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
                message: 'Password are Matching'
            })    

        let user = await taxPayerModel.findOne({
            email: req.body.email
        })    

        if(!user)
            return res.status(400).json({
                message: 'User not found'
            })

        if(user.password == md5(oldPassword)){

            var isUpdated = await taxPayerModel.findByIdAndUpdate({
                _id: user.id
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
        return res.state(400).json({
            message: error.message
        })
    }
}