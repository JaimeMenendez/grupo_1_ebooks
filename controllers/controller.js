const path = require('path')
const book = require('./libro.json')
const carrito = require('./carrito.json')
const seccion = require('./secciones.json')
const seccionSB = require('./seccionesSB.json')
const categorias = require('./categorias.json')

const controller = {
  sendHome: (req, res) => {
    res.render('home', { seccion: seccion, categorias: categorias })
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
    res.render('searchBook', seccionSB)
  },
  sendPageNotFound: (req, res) => {
    res.render('error404')
  }
}

module.exports = controller
