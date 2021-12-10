const express = require('express')
const controller = require('../controllers/controller')
const router = express.Router()

router.get('/', controller.sendHome)
router.get('/home', controller.sendHome)
router.get('/PoliticaDePrivacidad', controller.sendPoliticaDePrivacidad)
router.get('/TerminosyCondiciones', controller.sendTerminosyCondiciones)



router.get('/searchBook', controller.sendSearchPage)
router.get('/searchBook/:buttonId/', controller.sendCategoryButtons)
router.get('*', controller.sendPageNotFound)

module.exports = router
