const express = require('express')
const userController = require('../controllers/userController')
const routerUser = express.Router()

routerUser.get('/', userController.sendMyAccount)
routerUser.get('/security', userController.sendSecurity)
routerUser.get('/invoice', userController.sendInvoice)
routerUser.get('/edit-address/:id', userController.sendEditAddressView)
routerUser.get('/add-new-address', userController.sendAddAddressView)
routerUser.put('/edit-address/:id', userController.updateAddress)
routerUser.put('/make-default-address/:id', userController.makeDefaultAddress)
routerUser.post('/add-new-address', userController.storeNewAddress)

routerUser.delete('/delete-address/:id', userController.deleteAddress)
module.exports = routerUser
