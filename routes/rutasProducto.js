const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const productoController = require('../controllers/productoController')

// Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/booksCover')
  },
  filename: function (req, file, cb) {
    const nombre = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`
    cb(null, nombre)
  }
})
const upload = multer({ storage: storage })

// Routes
router.get('/libro', productoController.libro)
router.get('/', productoController.index)
router.get('/create', productoController.create)
router.post('/', upload.single('portada'), productoController.store)
router.get('/:id', productoController.detail)
router.get('/:id/edit', productoController.edit)
router.put('/:id/edit', upload.single('portada'), productoController.update)
router.delete('/delete/:id', productoController.destroy)

module.exports = router
