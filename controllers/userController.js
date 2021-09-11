const fs = require('fs')
const path = require('path')

const userPath = path.resolve(__dirname, 'user.json')

const seccion = require('./secciones.json')
const botonesPrincipales = require('./botonesPrincipales.json')
const user = require('./user.json')

const userController = {
  sendMyAccount: (req, res) => {
    res.render('users/myAccount', {
      user,
      botonesPrincipales: botonesPrincipales,
      busquedas: seccion.busquedas,
      favoritos: seccion.favoritos
    })
  },
  sendSecurity: (req, res) => {
    res.render('users/security', {
      busquedas: seccion.busquedas,
      favoritos: seccion.favoritos
    })
  },
  sendInvoice: (req, res) => {
    res.render('users/invoice', {
      busquedas: seccion.busquedas,
      favoritos: seccion.favoritos
    })
  },
  sendEditAddressView: (req, res) => {
    const direccionSolicitada = user.direcciones.find(
      (direccion) => direccion.id === Number.parseInt(req.params.id)
    )
    res.render('users/editar-direccion', { edit: true, ...direccionSolicitada })
  },
  sendAddAddressView: (req, res) => {
    res.render('users/editar-direccion', { edit: false })
  },
  storeNewAddress: (req, res) => {
    const newAddress = req.body
    if (user.direcciones.length > 0) {
      newAddress.id = user.direcciones[user.direcciones.length - 1].id + 1
      newAddress.predeterminada = false
    } else {
      newAddress.id = 1
      newAddress.predeterminada = true
    }

    user.direcciones.push(newAddress)
    fs.writeFileSync(userPath, JSON.stringify(user, null, 2))
    res.redirect('/users')
  },
  updateAddress: (req, res) => {
    const addressUpdated = req.body
    const id = Number.parseInt(req.params.id)

    const index = user.direcciones.findIndex((direccion) => direccion.id === id)

    if (index > 0) {
      addressUpdated.id = id
      user.direcciones[index] = addressUpdated
      fs.writeFileSync(userPath, JSON.stringify(user, null, 2))
    }
    res.redirect('/users')
  },
  deleteAddress: (req, res) => {
    const id = Number.parseInt(req.params.id)
    const index = user.direcciones.findIndex((direccion) => direccion.id === id)

    if (index > 0) {
      user.direcciones.splice(index, 1)
      fs.writeFileSync(userPath, JSON.stringify(user, null, 2))
    }
    res.redirect('/users')
  }
}

module.exports = userController
