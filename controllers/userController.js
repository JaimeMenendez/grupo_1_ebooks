const seccion = require('./secciones.json')
const botonesPrincipales = require('./botonesPrincipales.json')
const user = require('./user.json')

const userController = {
  sendMyAccount: (req, res) => {
    res.render('users/myAccount', { user, botonesPrincipales: botonesPrincipales, busquedas: seccion.busquedas, favoritos: seccion.favoritos })
  },
  sendSecurity: (req, res) => {
    res.render('users/security', { busquedas: seccion.busquedas, favoritos: seccion.favoritos })
  },
  sendInvoice: (req, res) => {
    res.render('users/invoice', { busquedas: seccion.busquedas, favoritos: seccion.favoritos })
  }
}

module.exports = userController
