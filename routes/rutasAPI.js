const express = require('express')
const api = express.Router()
const apiController = require('../controllers/apiController')
const authMiddleware = require("../middlewares/authMiddleware")

api.get('/products', apiController.products)
api.get('/products/:id', apiController.product)
api.get('/products/:id/detail', apiController.productDetail)
/* api.get('/products/create', apiController.create)
api.post('/products', apiController.store)
api.get('/products/car', authMiddleware, apiController.sendShoppingCart)
api.get('/products/:id/edit', apiController.edit)
api.put('/products/:id/edit', apiController.update)
api.delete('/products/delete/:id', apiController.destroy)
api.post('/products/add-item-to-car/:id', authMiddleware, apiController.addItemToCar)
api.delete("/products/remove-item-from-car/:id", apiController.removeItemFromCar)
api.put("/products/change-quantity-in-car/:id", apiController.changeQuantityInCar)
 */
api.get('/users', apiController.users)
api.get('/users/:id', apiController.user)
api.get('/users/:id/detail', apiController.userDetail)
api.get('/*', apiController.sendPageNotFound)

module.exports = api