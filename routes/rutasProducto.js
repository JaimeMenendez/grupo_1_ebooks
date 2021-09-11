const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const productoController = require('../controllers/productoController');

var storage = multer.diskStorage({
  destination: function (req, file, cb){
      cb (null, './public/images/booksCover')
  },
  filename: function(req, file, cb){
    const nombre =  `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    cb (null, nombre)
  }
})
var upload = multer({storage: storage})



router.get('/', productoController.index); 
router.get('/agregarLibro', productoController.create); 
router.post('/', upload.any(), productoController.store); 
router.get('/detail/:id', productoController.detail); 
router.get('/editarLibro/:id', productoController.edit); 
router.patch('/editarLibro/:id', upload.any(),productoController.update); 
router.delete('/delete/:id', productoController.destroy); 

module.exports = router;