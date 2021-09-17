const express = require('express')
const userController = require('../controllers/userController')
const routerUser = express.Router()
const multer = require('multer')
const path = require('path')
const guestMiddleware = require('../middlewares/guest.middleware')
const authMiddleware = require('../middlewares/authMiddleware')

// Multer
const storageUser = multer.diskStorage({
  destination: function(req, file, callback){
    callback(null,'./public/image/userProfile')
  },
  filename: function (req, file, callback) {
    const imageUser = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    cb(null, imageUser)
  },
})

// Especificamos la conf anterios como disco de almacenamiento de archivos
const UploadImageUser = multer({storageUser})

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


routerUser.get('/register', guestMiddleware, userController.registerView)
routerUser.get('/login',guestMiddleware, userController.loginView)

routerUser.get('/',authMiddleware, userController.sendMyAccount)

routerUser.get('/edit-data-user',authMiddleware, userController.sendSecurity)
routerUser.put('/edit-data-user',authMiddleware, UploadImageUser.single('imageUser'), userController.updateUser)

routerUser.get('/add-new-invoice',authMiddleware, userController.sendAddInvoiceView)
routerUser.post('/add-new-invoice',authMiddleware, userController.storeNewInvoice)

routerUser.get('/edit-invoice/:id',authMiddleware, userController.sendEditInvoiceView)
routerUser.put('/edit-invoice/:id',authMiddleware, userController.updateInvoice)
routerUser.put('/make-default-invoice/:id',authMiddleware, userController.makeDefaultInvoice)

routerUser.delete('/delete-invoice/:id',authMiddleware, userController.deleteInvoice)

routerUser.get('/edit-address/:id',authMiddleware, userController.sendEditAddressView)
routerUser.get('/add-new-address',authMiddleware, userController.sendAddAddressView)
routerUser.put('/edit-address/:id',authMiddleware, userController.updateAddress)
routerUser.put('/make-default-address/:id',authMiddleware, userController.makeDefaultAddress)
routerUser.post('/add-new-address',authMiddleware, userController.storeNewAddress)
routerUser.delete('/delete-address/:id',authMiddleware, userController.deleteAddress)

routerUser.post('/register',validarRegistro, userController.register)
routerUser.post('/login',validarLogin, userController.login)
routerUser.get('/logout', userController.logout)

module.exports = routerUser
