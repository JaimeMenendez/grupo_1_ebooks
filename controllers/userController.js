const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')
const UserModel = require('../Model/User')
const seccion = require('./secciones.json')
const botonesPrincipales = require('./botonesPrincipales.json')

const usersPath = path.resolve(__dirname, '../DB/usersDB.json')

const session = require('express-session')
const { validationResult } = require('express-validator')

let users = JSON.parse(fs.readFileSync(usersPath))

const userController = {
  sendMyAccount: (req, res) => {
    const user = req.session.userLogged
    res.render('users/myAccount', {
      user: user,
      botonesPrincipales: botonesPrincipales,
      busquedas: seccion.busquedas,
      favoritos: seccion.favoritos,
      nuevos: seccion.nuevos,
      userLogged: req.session.userLogged
    })
  },

  /** **************************************************/
  /** ************* METHODS FOR SECURITY ***************/
  /** **************************************************/

  sendSecurity: (req, res) => {
    const user = req.session.userLogged
    res.render('users/edit-data-user', {
      user: user,
      busquedas: seccion.busquedas,
      favoritos: seccion.favoritos,
      userLogged: req.session.userLogged
    })
  },

  updateUser: (req, res) => {
    const user = req.session.user
    res.redirect('/users')
  },

  /** **************************************************/
  /** ************** METHODS FOR INVOICE ***************/
  /** **************************************************/

  sendAddInvoiceView: (req, res) => {
    const user = req.session.userLogged
    res.render('users/invoice', {
      direcciones: user.direcciones,
      edit: false,
      busquedas: seccion.busquedas,
      nuevos: seccion.nuevos,
      userLogged: req.session.userLogged
    })
  },

  storeNewInvoice: (req, res) => {
    const newDataInvoice = req.body
    const user =req.session.userLogged
    let errors = validationResult(req)
    if(errors.isEmpty()){
      if (user.facturacion.length === 0) {
        newDataInvoice.id = 1
      } else {
        newDataInvoice.id = user.facturacion[user.facturacion.length - 1].id + 1
      }
      newDataInvoice.idDireccion = parseInt(newDataInvoice.idDireccion)
      newDataInvoice.predeterminada = false
      user.facturacion.push(newDataInvoice)
      saveUserToDB(user)
      res.redirect('/users')
    } else{
      console.log(req.body)
      const errores = errors.errors.reduce(
        (acc, error) => acc + `<p><i class="fas fa-exclamation-triangle"></i>${error.msg}</p>`,'')
      res.render('users/invoice',{
        mensaje: errores,
        warning: true,
        edit: false,
        oldValues: req.body,
        direcciones: user.direcciones,
        busquedas: seccion.busquedas,
        nuevos: seccion.nuevos,
        userLogged: req.session.userLogged
      })
    }
  },

  // Edit old invoice
  sendEditInvoiceView: (req, res) => {
    const user = req.session.userLogged
    const invoiceEdit = user.facturacion.find(
      (invoice) => invoice.id === parseInt(req.params.id)
    )
    res.render('users/invoice', {
      edit: true,
      user: invoiceEdit,
      direcciones: user.direcciones,
      busquedas: seccion.busquedas,
      nuevos: seccion.nuevos,
      userLogged: req.session.userLogged
    })
  },

  updateInvoice: (req, res) => {
    const user = req.session.userLogged
    const updateInvoice = req.body
    const errors = validationResult(req)
    const id = parseInt(req.params.id)
    const index = user.facturacion.findIndex((invoice) => invoice.id === id)
    if(errors.isEmpty()){
      if (index >= 0) {
        updateInvoice.id = id
        user.facturacion[index] = updateInvoice
        saveUserToDB(user)
      }
      res.redirect('/users')
    }else{
      const errores = errors.errors.reduce(
        (acc, error) => acc + `<p><i class="fas fa-exclamation-triangle"></i>${error.msg}</p>`,'')
      res.render('users/invoice',{
        mensaje: errores,
        warning: true,
        edit: false,
        oldValues: req.body,
        direcciones: user.direcciones,
        busquedas: seccion.busquedas,
        nuevos: seccion.nuevos,
        userLogged: req.session.userLogged
      })
    }
  },

  deleteInvoice: (req, res) => {
    const id = Number.parseInt(req.params.id)
    const user = req.session.userLogged
    const index = user.facturacion.findIndex((invoice) => invoice.id === id)

    if (index >= 0) {
      user.facturacion.splice(index, 1)
      saveUserToDB(user)
    }
    res.redirect('/users')
  },

  makeDefaultInvoice: (req, res) => {
    const id = parseInt(req.params.id)
    const user = req.session.userLogged
    user.facturacion.forEach((invoice) => {
      invoice.predeterminada = false
      if (invoice.id === id) {
        invoice.predeterminada = true
      }
    })
    saveUserToDB(user)
    res.redirect('/users')
  },

  /** **************************************************/
  /** ************** METHODS FOR ADDRESS ***************/
  /** **************************************************/

  sendEditAddressView: (req, res) => {
    const user = req.session.userLogged
    const direccionSolicitada = user.direcciones.find(
      (direccion) => direccion.id === Number.parseInt(req.params.id)
    )
    res.render('users/editar-direccion', {
      edit: true,
      ...direccionSolicitada,
      busquedas: seccion.busquedas,
      nuevos: seccion.nuevos,
      userLogged: req.session.userLogged
    })
  },

  sendAddAddressView: (req, res) => {
    res.render('users/editar-direccion', {
      edit: false,
      busquedas: seccion.busquedas,
      nuevos: seccion.nuevos,
      userLogged: req.session.userLogged
    })
  },

  storeNewAddress: (req, res) => {
    let newAddress = req.body
    let user = req.session.userLogged
    if (user.direcciones.length > 0) {
      newAddress.id = user.direcciones[user.direcciones.length - 1].id + 1
      newAddress.predeterminada = false
    } else {
      newAddress.id = 1
      newAddress.predeterminada = true
    }
    user.direcciones.push(newAddress)
    saveUserToDB(user)
    res.redirect('/users')
  },

  updateAddress: (req, res) => {
    const addressUpdated = req.body
    const user = req.session.userLogged
    const id = Number.parseInt(req.params.id)
    const index = user.direcciones.findIndex((direccion) => direccion.id === id)
    if (index >= 0) {
      addressUpdated.id = id
      addressUpdated.predeterminada = user.direcciones[index].predeterminada
      user.direcciones[index] = addressUpdated
      req.session.userLogged = user
      saveUserToDB(user)
    }
    res.redirect('/users')
  },

  deleteAddress: (req, res) => {
    const id = Number.parseInt(req.params.id)
    const user = req.session.userLogged
    const index = user.direcciones.findIndex((direccion) => direccion.id === id)
   

    if (index >= 0) {
      user.facturacion = user.facturacion.filter(factura => Number.parseInt(factura.idDireccion) != id)
      user.direcciones.splice(index, 1)
      saveUserToDB(user)
    }
    res.redirect('/users')
  },

  makeDefaultAddress: (req, res) => {
    const id = Number.parseInt(req.params.id)
    const user = req.session.userLogged
    user.direcciones.forEach((address) => {
      address.predeterminada = false
      if (address.id === id) {
        address.predeterminada = true
      }
    })
    saveUserToDB(user)
    res.redirect('/users')
  },

  /** **************************************************/
  /** ************** METHODS FOR REGISTER **************/
  /** **************************************************/
  registerView: (req, res) => {
    res.render('users/register', {userLogged: req.session.userLogged})
  },

  register: (req, res) => {
    let errors = validationResult(req)
    if (errors.isEmpty()) {
      const email = req.body.email
      if (users.findIndex((usuario) => usuario.email === email) === -1) {
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
        res.render('users/login', {
          mensaje: 'Tu cuenta ha sido creada, ahora puedes iniciar sesión.',
          warning: false
        })
      } else {
        res.render('users/register', {
          mensaje:
            '<p><i class="fas fa-exclamation-triangle"></i>El correo que está utilizando ya está registrado. Intente iniciar sesión o regístrese con otro correo.</p>',
          warning: true,
          oldValues: req.body
        })
      }
    } else {
      const errores = errors.errors.reduce(
        (acc, error) =>
          acc +
          `<p><i class="fas fa-exclamation-triangle"></i>${error.msg}</p>`,
        ''
      )
      res.render('users/register', {
        mensaje: errores,
        warning: true,
        oldValues: req.body
      })
    }
  },
  /** **************************************************/
  /** ************** METHODS FOR LOGIN **************/
  /** **************************************************/
  loginView: (req, res) => {
    res.render('users/login', {})
  },
  login: async (req, res) => {
    let errors = validationResult(req)
    if (errors.isEmpty()) { // Ocurre cuando no hay errores de validacion
      try {
        const userToLogin = await UserModel.findUserByEmail(req.body.email)
        const isLogged = await bcrypt.compare(req.body.password,userToLogin.password)//Lanza un error si no se encuentra el usuario
        if (isLogged) {
          delete userToLogin.password
          req.session.userLogged = userToLogin
          res.redirect('/')
        } else {
          res.render('users/login',{mensaje:
            '<p><i class="fas fa-exclamation-triangle"></i>Su contraseña no es correcta. Por favor, intente de nuevo.</p>',
          warning: true,
          oldValues: req.body})
        }
      } catch { // Ocurre cuando el usuario no existe
        res.render('users/login', {
          mensaje:
            '<p><i class="fas fa-exclamation-triangle"></i>Autenticación fallida. Compruebe que su correo y su contraseña sean correctos.</p>',
          warning: true,
          oldValues: req.body
        })
      }
    } else {
      const errores = errors.errors.reduce(
        (acc, error) => acc + `<p><i class="fas fa-exclamation-triangle"></i>${error.msg}</p>`,'')
      res.render('users/login', {
        mensaje: errores,
        warning: true,
        oldValues: req.body
      })
    }
  },
  logout: (req,res) => {
    delete req.session.userLogged
    res.redirect('/users/login')
  }
}

module.exports = userController

function findIndexById(element, collection) {
  return collection.findIndex(item => element.id === item.id)
}

function saveUserToDB(user){
  let users = JSON.parse(fs.readFileSync(usersPath,'utf-8'))
  const index = findIndexById(user, users)
  users[index] = {...user, password:users[index].password}
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2))
}