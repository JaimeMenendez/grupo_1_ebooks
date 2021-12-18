const express = require('express')
const api = express.Router()
const apiController = require('../controllers/apiController')

api.get('/products', apiController.products)
api.get('/products/:id', apiController.product)
api.get('/users', apiController.users)
api.get('/users/:id', apiController.user)
api.get('*', apiController.sendPageNotFound)

module.exports = api