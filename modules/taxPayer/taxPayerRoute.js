var express = require('express');
var mongoose = require('mongoose')
const router = express.Router();
var taxPayerController = require('./taxPayerController')
var taxPayerAuth = require('../../auth/middleware')
// const TaxPayerModel = require('../../models/tax-payer')

router.post('/signup', taxPayerController.signUp)
router.post('/login', taxPayerController.login)
router.post('/logout', taxPayerAuth.verifyToken, taxPayerController.logout )
router.post('/changePassword', taxPayerController.changePassword)

module.exports = router;