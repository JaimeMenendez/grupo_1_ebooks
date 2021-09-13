const fs = require('fs')
const path = require('path')

const usersPath = path.resolve(__dirname, '../DB/usersDB.json')

const seccion = require('./secciones.json')
const botonesPrincipales = require('./botonesPrincipales.json')
const users = JSON.parse(fs.readFileSync(usersPath))

const userController = {
  sendMyAccount: (req, res) => {
    const user = users[0]
    res.render('users/myAccount', {
      user: user,
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
  // Create new invoice
  sendAddInvoiceView: (req, res) => {
    res.render('users/invoice', { edit: false })
  },
  storeNewInvoice: (req, res) => {
    res.redirect('/users')
  },
  // Edit old invoice
  sendEditInvoiceView: (req, res) => {
    res.render('users/invoice', { edit: true })
  },
  updateInvoice: (req, res) => {
    res.redirect('/users')
  },
  sendEditAddressView: (req, res) => {
    const user = users[0]
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
    const user = users[0]
    if (user.direcciones.length > 0) {
      newAddress.id = user.direcciones[user.direcciones.length - 1].id + 1
      newAddress.predeterminada = false
    } else {
      newAddress.id = 1
      newAddress.predeterminada = true
    }

    user.direcciones.push(newAddress)
    users[0] = user
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2))
    res.redirect('/users')
  },
  updateAddress: (req, res) => {
    const addressUpdated = req.body
    const user = users[0]
    const id = Number.parseInt(req.params.id)

    const index = user.direcciones.findIndex((direccion) => direccion.id === id)
    if (index >= 0) {
      addressUpdated.id = id
      addressUpdated.predeterminada = users[0].direcciones[index].predeterminada
      users[0].direcciones[index] = addressUpdated
      fs.writeFileSync(usersPath, JSON.stringify(users, null, 2))
    }
    res.redirect('/users')
  },
  deleteAddress: (req, res) => {
    const id = Number.parseInt(req.params.id)
    const user = users[0]
    const index = user.direcciones.findIndex((direccion) => direccion.id === id)

    if (index >= 0) {
      user.direcciones.splice(index, 1)
      users[0] = user
      fs.writeFileSync(usersPath, JSON.stringify(users, null, 2))
    }
    res.redirect('/users')
  },
  makeDefaultAddress: (req, res) => {
    const id = Number.parseInt(req.params.id)
    const user = users[0]
    user.direcciones.forEach((address) => {
      address.predeterminada = false
      if (address.id === id) {
        address.predeterminada = true
      }
    })
    users[0] = user
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2))
    res.redirect('/users')
  },
  register: (req, res) => {
    const email = req.body.email
    if (users.findIndex(usuario => usuario.email === email) === -1) {
      const newUser = {
        ...req.body,
        direcciones: [],
        facturacion: [],
        category: 'cliente'
      }

      users.push(newUser)
      fs.writeFileSync(usersPath, JSON.stringify(users, null, 2))
      res.render('users/login', { mensaje: 'Tu cuenta ha sido creada, ahora puedes iniciar sesión.', warning: false })
    } else {
      res.render('users/register', { mensaje: 'El correo que está utilizando ya está registrado. Intente iniciar sesión o regístrese con otro correo.', warning: true })
    }
  }
}

module.exports = userController
