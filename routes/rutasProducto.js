
const express = require('express')
const productoController = require('../controllers/productoController')
const routerProducto = express.Router()
const path = require('path')

const multer = require('multer')
const multerStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    const destino = './public/images/booksCover'
    callback(null, destino)
  },
  filename: (req, file, callback) => {
    const nombre = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    callback(null, nombre)
  }
})
const uploadFile = multer({ storage: multerStorage })

routerProducto.get('/editarLibro/:id', productoController.editarLibroView)
routerProducto.get('/agregarLibro', productoController.agregarLibroView)
routerProducto.post('/agregarLibro', uploadFile.single('portada'), productoController.agregarLibro)
routerProducto.get('/:id', productoController.sendProductoID)

module.exports = routerProducto
