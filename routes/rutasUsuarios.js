const express = require('express')
const userController = require('../controllers/userController')
const routerUser = express.Router()

routerUser.get('/', userController.sendMyAccount)
routerUser.get('/security', userController.sendSecurity)
routerUser.get('/invoice', userController.sendInvoice)
routerUser.get('/edit-address/:id', userController.sendEditAddressView)
routerUser.get('/add-new-address', userController.sendEditAddressView)
routerUser.put('/edit-address/:id', userController.sendEditAddressView)
routerUser.put('/delete-address/:id', userController.sendEditAddressView)
module.exports = routerUser
