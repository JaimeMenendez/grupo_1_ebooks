const book = require('./libro.json')
const carrito = require('./carrito.json')
const seccion = require('./secciones.json')
const categorias = require('./categorias.json')
const botonesPrincipales = require('./botonesPrincipales.json')

const controller = {
  sendHome: (req, res) => {
    res.render('main/home', { seccion: seccion, categorias: categorias, botonesPrincipales: botonesPrincipales })
  },
  sendPoliticaDePrivacidad: (req, res) => {
    res.render('main/documento', { documento: '../partials/politica' })
  },
  sendTerminosyCondiciones: (req, res) => {
    res.render('main/documento', { documento: '../partials/terminos' })
  },
  sendShoppingCart: (req, res) => {
    res.render('products/carrito', carrito)
  },
  sendProductDescription: (req, res) => {
    res.render('products/description', book)
  },
  sendSearchPage: (req, res) => {
    const buttonPressed = 'searchBook'
    res.render('main/searchBook', { seccion: seccion, categorias: categorias, buttonPressed: buttonPressed })
  },
  sendCategoryButtons: (req, res) => {
    const buttonPressed = categorias.categoriasDeBotones.find(boton => boton.idClass === req.params.buttonId)
    res.render('main/searchBook', { seccion: seccion, categorias: categorias, buttonPressed: buttonPressed })
  },
  sendPageNotFound: (req, res) => {
    res.render('main/error404')
  }
}

module.exports = controller
