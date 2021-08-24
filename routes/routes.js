const path = require('path');
const express = require('express');
const controller = require('../controllers/controller');
const router = express.Router();

const multer = require('multer');
const multerStorage = multer.diskStorage({
    destination: (req,file,callback) =>{
        const destino = './public/images/booksCover';
        callback(null, destino);
    },
    filename:(req,file,callback) =>{
        const nombre = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
        callback(null, nombre);}
    })

const uploadFile = multer({storage:  multerStorage})

router.get("/", controller.sendHome);
router.get("/home", controller.sendHome);
router.get("/PoliticaDePrivacidad", controller.sendPoliticaDePrivacidad)
router.get("/TerminosyCondiciones", controller.sendTerminosyCondiciones)
router.get("/carrito", controller.sendShoppingCart)
router.get("/description", controller.sendProductDescription)
router.get("/login",controller.sendLogin)
router.get("/register", controller.sendRegister)
router.get("/searchBook", controller.sendSearchPage)
router.get("/agregarLibro", controller.agregarLibroView)
router.post("/agregarLibro",uploadFile.single('portada'),controller.agregarLibro)
router.get("*", controller.sendPageNotFound)

module.exports = router;