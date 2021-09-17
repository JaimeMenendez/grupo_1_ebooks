const fs = require('fs')
const path = require('path')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')


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
      favoritos: seccion.favoritos,
      nuevos: seccion.nuevos
    })
  },

  /** **************************************************/
  /** ************* METHODS FOR SECURITY ***************/
  /** **************************************************/

  sendSecurity: (req, res) => {
    const user = users[0]
    res.render('users/edit-data-user', {
      user: user,
      busquedas: seccion.busquedas,
      favoritos: seccion.favoritos
    })
  },

  updateUser: (req, res) => {
    const user = users[0]
    res.redirect('/users')
  },

  /** **************************************************/
  /** ************** METHODS FOR INVOICE ***************/
  /** **************************************************/

  sendAddInvoiceView: (req, res) => {
    const user = users[0]
    res.render('users/invoice', { direcciones: user.direcciones, 
      edit: false,
      busquedas: seccion.busquedas,
      nuevos: seccion.nuevos  })
  },

  storeNewInvoice: (req, res) => {
    const newDataInvoice = req.body
    const user = users[0]
    if (user.facturacion.length === 0) {
      newDataInvoice.id = 1
    } else {
      newDataInvoice.id = user.facturacion[user.facturacion.length - 1].id + 1
    }
    newDataInvoice.idDireccion = parseInt(newDataInvoice.idDireccion)
    newDataInvoice.predeterminada = false
    user.facturacion.push(newDataInvoice)
    users[0] = user
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2))
    res.redirect('/users')
  },

  // Edit old invoice
  sendEditInvoiceView: (req, res) => {
    const user = users[0]
    const invoiceEdit = user.facturacion.find(invoice => invoice.id === parseInt(req.params.id))
    res.render('users/invoice', { edit: true, 
      user: invoiceEdit, 
      direcciones: user.direcciones,
      busquedas: seccion.busquedas,
      nuevos: seccion.nuevos  })
  },

  updateInvoice: (req, res) => {
    const user = users[0]
    const updateInvoice = req.body
    const id = parseInt(req.params.id)
    const index = user.facturacion.findIndex(invoice => invoice.id === id)
    if (index >= 0) {
      updateInvoice.id = id
      user.facturacion[index] = updateInvoice
      users[0] = user
      fs.writeFileSync(usersPath, JSON.stringify(users[0], null, 2))
    }
    res.redirect('/users')
  },

  deleteInvoice: (req, res) => {
    const id = Number.parseInt(req.params.id)
    const user = users[0]
    const index = user.facturacion.findIndex((invoice) => invoice.id === id)

    if (index >= 0) {
      user.facturacion.splice(index, 1)
      users[0] = user
      fs.writeFileSync(usersPath, JSON.stringify(users, null, 2))
    }
    res.redirect('/users')
  },

  makeDefaultInvoice: (req, res) => {
    const id = parseInt(req.params.id)
    const user = users[0]
    user.facturacion.forEach(invoice => {
      invoice.predeterminada = false
      if (invoice.id === id) {
        invoice.predeterminada = true
      }
    })
    users[0] = user
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2))
    res.redirect('/users')
  },

  /** **************************************************/
  /** ************** METHODS FOR ADDRESS ***************/
  /** **************************************************/

  sendEditAddressView: (req, res) => {
    const user = users[0]
    const direccionSolicitada = user.direcciones.find(
      (direccion) => direccion.id === Number.parseInt(req.params.id)
    )
    res.render('users/editar-direccion', { edit: true,
      ...direccionSolicitada, 
      busquedas: seccion.busquedas,
      nuevos: seccion.nuevos })
  },

  sendAddAddressView: (req, res) => {
    res.render('users/editar-direccion', { edit: false,
      busquedas: seccion.busquedas,
      nuevos: seccion.nuevos  })
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
    const index = user.direcciones.findIndex(direccion => direccion.id === id)
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

  /** **************************************************/
  /** ************** METHODS FOR REGISTER **************/
  /** **************************************************/
  registerView: (req, res) => {
    res.render('users/register')
  },

  register: (req, res) => {
    let errors = validationResult(req)
    if(errors.isEmpty()){
      const email = req.body.email
      if (users.findIndex(usuario => usuario.email === email) === -1) {
        const newUser = {
          ...req.body,
          password: bcrypt.hashSync(req.body.password, 10),
          direcciones: [],
          facturacion: [],
          category: 'cliente',
          id: users[users.length - 1].id + 1
        }

        users.push(newUser)
        fs.writeFileSync(usersPath, JSON.stringify(users, null, 2))
        res.render('users/login', { mensaje: 'Tu cuenta ha sido creada, ahora puedes iniciar sesión.', warning: false })
      } else {
        res.render('users/register', {mensaje: '<p><i class="fas fa-exclamation-triangle"></i>El correo que está utilizando ya está registrado. Intente iniciar sesión o regístrese con otro correo.</p>', warning: true, oldValues:req.body })
      }
    }else{
      const errores = errors.errors.reduce((acc,error) => acc + `<p><i class="fas fa-exclamation-triangle"></i>${error.msg}</p>`,'')
      res.render('users/register', {mensaje: errores, warning: true, oldValues:req.body})
    }
  },
/** **************************************************/
/** ************** METHODS FOR LOGIN **************/
/** **************************************************/
  loginView:(req,res) =>{
      res.render('users/login')
  },
  login: (req, res) =>{
    let errors = validationResult(req)
    const errores = errors.errors.reduce((acc,error) => acc + `<p><i class="fas fa-exclamation-triangle"></i>${error.msg}</p>`,'')
    res.render('users/login', {mensaje: errores, warning: true, oldValues: req.body})
  }
}

module.exports = userController
