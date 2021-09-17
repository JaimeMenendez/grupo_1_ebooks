const book = require('./libro.json')
const carrito = require('./carrito.json')
const seccion = require('./secciones.json')
const categorias = require('./categorias.json')
const botonesPrincipales = require('./botonesPrincipales.json')

const controller = {
  sendHome: (req, res) => {
    res.render('main/home', { seccion: seccion, categorias: categorias, botonesPrincipales: botonesPrincipales,userLogged: req.session.userLogged })
  },
  sendPoliticaDePrivacidad: (req, res) => {
    res.render('main/documento', { documento: '../partials/politica',userLogged: req.session.userLogged })
  },
  sendTerminosyCondiciones: (req, res) => {
    res.render('main/documento', { documento: '../partials/terminos',userLogged: req.session.userLogged })
  },
  sendShoppingCart: (req, res) => {
    res.render('products/carrito', {...carrito,userLogged: req.session.userLogged})
  },
  sendProductDescription: (req, res) => {
    res.render('products/description', {...book,userLogged: req.session.userLogged})
  },
  sendSearchPage: (req, res) => {
    const buttonPressed = 'searchBook'
    res.render('main/searchBook', { seccion: seccion, categorias: categorias, buttonPressed: buttonPressed, userLogged: req.session.userLogged })
  },
  sendCategoryButtons: (req, res) => {
    const buttonPressed = categorias.categoriasDeBotones.find(boton => boton.idClass === req.params.buttonId)
    res.render('main/searchBook', { seccion: seccion, categorias: categorias, buttonPressed: buttonPressed,userLogged: req.session.userLogged })
  },
  sendPageNotFound: (req, res) => {
    res.render('main/error404',{userLogged: req.session.userLogged})
  }
}

module.exports = controller
