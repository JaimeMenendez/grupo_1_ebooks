const path = require('path')
const book = require('./libro.json')
const carrito = require('./carrito.json')
const seccion = require('./secciones.json')
const categorias = require('./categorias.json')

const controller = {
  sendHome: (req, res) => {
    let buttonPressed = 'home'
    res.render('home', { seccion: seccion, categorias: categorias, buttonPressed: buttonPressed })
  },
  sendPoliticaDePrivacidad: (req, res) => {
    res.render('documento', { documento: './partials/politica' })
  },
  sendTerminosyCondiciones: (req, res) => {
    res.render('documento', { documento: './partials/terminos' })
  },
  sendShoppingCart: (req, res) => {
    res.render('carrito', carrito)
  },
  sendProductDescription: (req, res) => {
    res.render('description', book)
  },
  sendLogin: (req, res) => {
    const htmlPath = path.resolve(__dirname, '../views/login.html')
    res.sendFile(htmlPath)
  },
  sendRegister: (req, res) => {
    const htmlPath = path.resolve(__dirname, '../views/register.html')
    res.sendFile(htmlPath)
  },
  sendSearchPage: (req, res) => {
    let buttonPressed = 'searchBook'
    res.render('searchBook', { seccion: seccion, categorias: categorias, buttonPressed: buttonPressed })
  },
  sendCategoryButtons: (req, res) => {
    let buttonPressed = categorias.categoriasDeBotones.find(boton => boton.idClass === req.params.buttonId)
    res.render('searchBook', { seccion: seccion, categorias: categorias, buttonPressed: buttonPressed })
  },
  sendPageNotFound: (req, res) => {
    res.render('error404')
  }
}

module.exports = controller
