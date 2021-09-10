const express = require('express')
const userController = require('../controllers/userController')
const routerUser = express.Router()

routerUser.get('/', userController.sendMyAccount)
routerUser.get('/security', userController.sendSecurity)
routerUser.get('/invoice', userController.sendInvoice)
module.exports = routerUser
