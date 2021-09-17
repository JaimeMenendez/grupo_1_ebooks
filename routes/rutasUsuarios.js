const express = require('express')
const userController = require('../controllers/userController')
const routerUser = express.Router()

// Express Validator
const {body} = require('express-validator')
const validarRegistro = [
  body('firstName').notEmpty().withMessage("Debe especificar su nombre."),
  body('lastName').notEmpty().withMessage("Debe especificar sus apellidos."),
  body('email').notEmpty().withMessage("Debe especificar un email.").bail()
                .isEmail().withMessage('Debe introducir un email válido.'),
  body('password').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage("La contraseña debe tener una letra en minúscula, una letra en mayúscula, un número y al menos 8 caracteres.")
]

const validarLogin = [
  body('email').notEmpty().withMessage("Debe especificar un email.").bail()
               .isEmail().withMessage('Debe introducir un email válido.'),
  body('password').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage("La contraseña no es correcta, por favor, intente nuevamente.")
]


routerUser.get('/register', userController.registerView)
routerUser.get('/login', userController.loginView)

routerUser.get('/', userController.sendMyAccount)
routerUser.get('/security', userController.sendSecurity)

routerUser.get('/add-new-invoice', userController.sendAddInvoiceView)
routerUser.post('/add-new-invoice', userController.storeNewInvoice)

routerUser.get('/edit-invoice/:id', userController.sendEditInvoiceView)
routerUser.put('/edit-invoice/:id', userController.updateInvoice)
routerUser.put('/make-default-invoice/:id', userController.makeDefaultInvoice)

routerUser.delete('/delete-invoice/:id', userController.deleteInvoice)

routerUser.get('/edit-address/:id', userController.sendEditAddressView)
routerUser.get('/add-new-address', userController.sendAddAddressView)
routerUser.put('/edit-address/:id', userController.updateAddress)
routerUser.put('/make-default-address/:id', userController.makeDefaultAddress)
routerUser.post('/add-new-address', userController.storeNewAddress)
routerUser.delete('/delete-address/:id', userController.deleteAddress)

routerUser.post('/register',validarRegistro, userController.register)
routerUser.post('/login',validarLogin, userController.login)

module.exports = routerUser
