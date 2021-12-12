const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const productoController = require('../controllers/productoController')
const authMiddleware = require("../middlewares/authMiddleware")
const routerUser = require("./rutasUsuarios")

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
router.get('/car', authMiddleware,productoController.sendShoppingCart)
router.get('/libro', productoController.libro)
router.get('/', productoController.index)
router.get('/create', productoController.create)
router.post('/', upload.single('portada'), productoController.store)
router.get('/:id', productoController.detail)
router.get('/:id/edit', productoController.edit)
router.put('/:id/edit', upload.single('portada'), productoController.update)
router.delete('/delete/:id', productoController.destroy)

router.post('/add-item-to-car/:id',authMiddleware, productoController.addItemToCar)
router.delete("/remove-item-from-car/:id", productoController.removeItemFromCar)
router.put("/change-quantity-in-car/:id", productoController.changeQuantityInCar)

module.exports = router
