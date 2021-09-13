const express = require('express')
const userController = require('../controllers/userController')
const routerUser = express.Router()

routerUser.get('/', userController.sendMyAccount)
routerUser.get('/security', userController.sendSecurity)

routerUser.get('/add-new-invoice', userController.sendAddInvoiceView)
routerUser.post('/add-new-invoice', userController.storeNewInvoice)
routerUser.get('/edit-invoice/:id', userController.sendEditInvoiceView)
routerUser.put('/edit-invoice/:id', userController.updateInvoice)

routerUser.get('/edit-address/:id', userController.sendEditAddressView)
routerUser.get('/add-new-address', userController.sendAddAddressView)
routerUser.put('/edit-address/:id', userController.updateAddress)
routerUser.put('/make-default-address/:id', userController.makeDefaultAddress)
routerUser.post('/add-new-address', userController.storeNewAddress)
routerUser.delete('/delete-address/:id', userController.deleteAddress)

routerUser.post('/register', userController.register)

module.exports = routerUser
