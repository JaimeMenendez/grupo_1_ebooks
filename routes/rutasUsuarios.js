const express = require('express')
const multer = require('multer')
const path = require('path')
const routerUser = express.Router()
const userController = require('../controllers/userController')
const guestMiddleware = require('../middlewares/guest.middleware')
const authMiddleware = require('../middlewares/authMiddleware')
const middleware = require('../middlewares/allMiddlewares')

const validarInvoice = middleware.validarInvoice
const validarRegistro = middleware.validarRegistro
const validarLogin = middleware.validarLogin
const validarDataUser = middleware.validarDataUser

// Multer
const storageUser = multer.diskStorage({
  destination: function(req, file, callback){
    callback(null,'./public/images/userProfile')
  },
  filename: function (req, file, callback) {
    const name = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    console.log(name)
    callback(null, name)
  },
})

// Especificamos la conf anterios como disco de almacenamiento de archivos
const UploadImageUser = multer({storage: storageUser})

routerUser.get('/register', guestMiddleware, userController.registerView)
routerUser.get('/login',guestMiddleware, userController.loginView)

routerUser.get('/',authMiddleware, userController.sendMyAccount)

routerUser.get('/edit-data-user',authMiddleware, userController.sendSecurity)
routerUser.put('/edit-data-user',authMiddleware,  UploadImageUser.single('userImage'), validarDataUser, userController.updateUser)

routerUser.get('/add-new-invoice',authMiddleware, userController.sendAddInvoiceView)
routerUser.post('/add-new-invoice',authMiddleware, validarInvoice, userController.storeNewInvoice)

routerUser.get('/edit-invoice/:id',authMiddleware, userController.sendEditInvoiceView)
routerUser.put('/edit-invoice/:id',authMiddleware, validarInvoice, userController.updateInvoice)
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
