const express = require('express')
const controller = require('../controllers/controller')
const router = express.Router()

router.get('/', controller.sendHome)
router.get('/home', controller.sendHome)
router.get('/PoliticaDePrivacidad', controller.sendPoliticaDePrivacidad)
router.get('/TerminosyCondiciones', controller.sendTerminosyCondiciones)
router.get('/carrito', controller.sendShoppingCart)
router.get('/description', controller.sendProductDescription)
router.get('/login', controller.sendLogin)
router.get('/register', controller.sendRegister)
router.get('/searchBook', controller.sendSearchPage)

router.get('*', controller.sendPageNotFound)

module.exports = router
