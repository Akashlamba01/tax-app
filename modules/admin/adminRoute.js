const router = require('express').Router()
// const router = express.Router()
const adminConteroller = require('./adminController')
const adminAuth = require('../../auth/middleware')

router.post('/login', adminConteroller.login)
router.post('/logout', adminAuth.adminVerifyToken,adminConteroller.logout)
router.post('/changePassword', adminConteroller.changePassword)
router.post('/views', adminConteroller.views)
router.get('/userList', adminConteroller.taxPayersList)


module.exports = router

