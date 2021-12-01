//https://www.digitalocean.com/community/questions/error-2002-hy000-can-t-connect-to-local-mysql-server-through-socket-var-run-mysqld-mysqld-sock-2
const fs = require('fs')
const db = require('../database/models')
const path = require('path')
const bcrypt = require('bcryptjs')
const UserModel = require('../Model/User')
const seccion = require('./secciones.json')
const botonesPrincipales = require('./botonesPrincipales.json')

const usersPath = path.resolve(__dirname, '../DB/usersDB.json')
const productsFilePath = path.join(__dirname, '../DB/librosDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const { validationResult } = require('express-validator')

let users = JSON.parse(fs.readFileSync(usersPath))


let articulosDB = function (idClass, nuevo, formato) {
  return products.map(articulo => {
    return articulo = { ...articulo, idClass: idClass, nuevo: nuevo, clasificacion: 3, formato: formato }
  })
}

let tamaño = articulosDB.length

seccion.favoritos.articulos = articulosDB("", true, "").filter(articulo => articulo.id <= tamaño && articulo.id > (tamaño - 8));
seccion.nuevos.articulos = articulosDB("", true, "").filter(articulo => articulo.id <= 16 && articulo.id > 8);
seccion.busquedas.articulos = articulosDB("", false, "ebook").filter(articulo => articulo.id <= 13 && articulo.id > 5);


const userController = {
  sendMyAccount: (req, res) => {
    const user = req.session.userLogged
    console.log('Lo que tiene user: ', user)
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

  updateUser: async(req, res) => {
    const user = req.session.userLogged
    let errors = validationResult(req)
    let update
    if (errors.isEmpty()) {
      try{
        if(req.file){
          update = await db.usuario.update({
            firstName: req.body.nombre,
            lastName: req.body.apellido,
            email: req.body.correo,
            imageUser: req.file.path
          },{ where: {email: user.email}, returning: true})
          req.session.userLogged = {...req.session.userLogged,
            firstName: req.body.nombre,
            lastName: req.body.apellido,
            email: req.body.correo,
            imageUser: req.file.path
          }
        }else{
          update = await db.usuario.update({
            firstName: req.body.nombre,
            lastName: req.body.apellido,
            email: req.body.correo
          },{ where: {email: user.email}, returning: true})
          req.session.userLogged = {...req.session.userLogged,
            firstName: req.body.nombre,
            lastName: req.body.apellido,
            email: req.body.correo
          }
        }
        let mensaje = `<p><i class="fas fa-exclamation-triangle"></i>Datos de usuario editados correctamente</p>`
        res.render('users/edit-data-user', {
          mensaje: mensaje,
          warning: false,
          user: req.session.userLogged,
          busquedas: seccion.busquedas,
          favoritos: seccion.favoritos,
          userLogged: req.session.userLogged
        })
      }catch(errorDB){
        console.log(errorDB)
      }
    } else {
      const errores = errors.errors.reduce(
        (acc, error) => acc + `<p><i class="fas fa-exclamation-triangle"></i>${error.msg}</p>`, '')
      res.render('users/edit-data-user', {
        mensaje: errores,
        warning: true,
        user: user,
        busquedas: seccion.busquedas,
        favoritos: seccion.favoritos,
        userLogged: req.session.userLogged
      })
    }
  },

  updateUserPassword: async(req, res) => {
    const user = req.session.userLogged
    let errors = validationResult(req)
    if (errors.isEmpty()) {
      user.password = await bcrypt.hash(req.body.contraseña, 10)
      await db.usuario.update({
        ...user
      },{
        where: {
          id: user.id
        }
      })
      await updateUserLogged(user.id,db,req)
      let mensaje = `<p><i class="fas fa-exclamation-triangle"></i>La contraseña ha sido actualizada</p>`
      res.render('users/edit-data-user', {
        mensaje: mensaje,
        warning: false,
        user: user,
        busquedas: seccion.busquedas,
        favoritos: seccion.favoritos,
        userLogged: req.session.userLogged
      })
    } else {
      const errores = errors.errors.reduce(
        (acc, error) => acc + `<p><i class="fas fa-exclamation-triangle"></i>${error.msg}</p>`, '')
      res.render('users/edit-data-user', {
        mensaje: errores,
        warning: true,
        user: user,
        busquedas: seccion.busquedas,
        favoritos: seccion.favoritos,
        userLogged: req.session.userLogged
      })
    }
  },

  /** **************************************************/
  /** ************** METHODS FOR INVOICE ***************/
  /** **************************************************/
  // edit == 1 -> 'Editando el formulario' 
  // edit == 0 -> 'Agregando una nueva dirección de facturación'
  // edit == 2 -> 'Agregando una nueva dirección de facturación con errores en el formulario'
  
  sendEditInvoiceView: async(req, res) => {
    const user = req.session.userLogged
    try{
      const datosDeFacturacion = await db.datosFacturacion.findOne({
        include: [{
          model: db.direccion
        }],
        where: {
          id: req.params.id
        }
      })
      datosDeFacturacion.dataValues = {...datosDeFacturacion.dataValues, id: req.params.id}
      console.log('Las direcciones de usuario son: ', user.direcciones)
      console.log('Los datos de facturación son: ', datosDeFacturacion)
      res.render('users/invoice', {
        edit: 1,
        user: datosDeFacturacion.dataValues,
        direcciones: user.direcciones,
        busquedas: seccion.busquedas,
        nuevos: seccion.nuevos,
        userLogged: req.session.userLogged
      }) 
    }catch(e){
      console.log('Hubo un error al cargar la vista de editar un invoice')
    }
  },
  
  sendAddInvoiceView: (req, res) => {
    const user = req.session.userLogged
    try{
      res.render('users/invoice', {
        edit: 0,
        user: user,
        direcciones: user.direcciones,
        busquedas: seccion.busquedas,
        nuevos: seccion.nuevos,
        userLogged: req.session.userLogged
      })
    }catch(e){
      console.log('Hubo un error al enviar la vista de facturación ',e)
    }
  },

  storeNewInvoice: async(req, res) => {
    const user = req.session.userLogged
    let errors = validationResult(req)
    if (errors.isEmpty()) {
      try{
        await db.datosFacturacion.create({
          razonSocial: req.body.razonSocial,
          rfc: req.body.rfc,
          predeterminado: false,
          direccionId: req.body.idDireccion
        })
        await updateUserLogged(user.id,db,req)
        res.redirect('/users')
      }catch(e){
        console.log('Hubo un error al crear los datos de facturación ',e)
      }
    } else {
      const errores = errors.errors.reduce(
        (acc, error) => acc + `<p><i class="fas fa-exclamation-triangle"></i>${error.msg}</p>`, '')
      res.render('users/invoice', {
        mensaje: errores,
        warning: true,
        edit: 2,
        user: { direcciones: req.body.idDireccion == '' ? user.direcciones.push({id: 0}): user.direcciones,razonSocial: req.body.razonSocial, rfc: req.body.rfc, direccionId: req.body.idDireccion == '' ? 0 : req.body.idDireccion },
        direcciones: user.direcciones,
        busquedas: seccion.busquedas,
        nuevos: seccion.nuevos,
        userLogged: req.session.userLogged
      })
    }
  },

  updateInvoice: async(req, res) => {
    const user = req.session.userLogged
    const errors = validationResult(req)
    if(errors.isEmpty()){
      try{
        await db.datosFacturacion.update({
          razonSocial: req.body.razonSocial,
          rfc: req.body.rfc,
          direccionId: req.body.idDireccion
        },
        {
          where: {
            id: req.params.id
          }
        })
        await updateUserLogged(user.id,db,req)
        res.redirect('/users')
      }catch(e){
        console.log('Hubo un error al actualizar los datos de facturación ', e)
      }
    }else{
      const errores = errors.errors.reduce(
        (acc, error) => acc + `<p><i class="fas fa-exclamation-triangle"></i>${error.msg}</p>`, '')
      res.render('users/invoice', {
        mensaje: errores,
        warning: true,
        edit: 1,
        user: {direcciones: req.body.idDireccion == '' ? user.direcciones.push({id: 0}): user.direcciones,razonSocial: req.body.razonSocial, rfc: req.body.rfc, direccionId: req.body.idDireccion == '' ? 0 : req.body.idDireccion },
        direcciones: user.direcciones,
        busquedas: seccion.busquedas,
        nuevos: seccion.nuevos,
        userLogged: req.session.userLogged
    })
  }
  },

  deleteInvoice: async(req, res) => {
    const user = req.session.userLogged
    try{
      await db.datosFacturacion.destroy({
        where: {
          id: req.params.id
        }
      })
      await updateUserLogged(user.id,db,req)
      res.redirect('/users')
    }catch(e){
      console.log('Hubo un error al eliminar los datos de facturación ',e)
    }
  },

  makeDefaultInvoice: async(req, res) => {
    const user = req.session.userLogged
    try{
      await db.usuario.update({
        invoiceDefault: req.params.id
      },{
        where:{
          id: user.id
        }
      })
    await updateUserLogged(user.id,db,req)
    res.redirect('/users')
    }catch(e){
      console.log('Hubo un error al hacer predeterminada la dirección de facturación', e)
    }
  },

  /** **************************************************/
  /** ************** METHODS FOR ADDRESS ***************/
  /** **************************************************/
  // edit == 1 -> 'Editando el formulario' 
  // edit == 0 -> 'Agregando una nueva dirección'
  // edit == 2 -> 'Agregando una nueva dirección con errores en el formulario'

  sendEditAddressView: async(req, res) => {
    const user = req.session.userLogged
    try{
      const direccionSolicitada = await db.direccion.findOne(
        {include: [{
          model: db.usuario,
          as: 'usuarios' 
        }],
        where: {
          id: req.params.id
        }
      })
      res.render('users/editar-direccion', {
        edit: 1,
        ...direccionSolicitada.dataValues,
        busquedas: seccion.busquedas,
        nuevos: seccion.nuevos,
        userLogged: req.session.userLogged
      })
    }catch(e){
      console.log('Ocurrió un error al enviar la vista', e)
    }
  },

  sendAddAddressView: (req, res) => {
    res.render('users/editar-direccion', {
      edit: 0,
      busquedas: seccion.busquedas,
      nuevos: seccion.nuevos,
      userLogged: req.session.userLogged
    })
  },

  storeNewAddress: async(req, res) => {
    let user = req.session.userLogged
    let newAddress = req.body
    let errors = validationResult(req)
    if(errors.isEmpty()){
      try{
        await db.direccion.create({
          ...newAddress,
          idUsuario: user.id
        })
        await updateUserLogged(user.id,db,req)
        res.redirect('/users')
        }catch(errorDB){
        console.log(errorDB)
      }
    }else{
      let errores = errors.errors.reduce(
        (acc, error) => acc + `<p><i class="fas fa-exclamation-triangle"></i>${error.msg}</p>`,' '
      )
      res.render('users/editar-direccion',{
        edit: 2,
        ...newAddress,
        mensaje: errores,
        warning: true,
        busquedas: seccion.busquedas,
        nuevos: seccion.nuevos,
        userLogged: user
      })
    } 
  },

  updateAddress: async(req, res) => {
    const user = req.session.userLogged
    let addressUpdated = req.body
    let errors = validationResult(req)
    if(errors.isEmpty()){
      try{
       await db.direccion.update({
          ...addressUpdated,
          idUsuario: user.id
        },{
          where: {
            id: req.params.id
          }
        })
        await updateUserLogged(user.id,db,req)
        res.redirect('/users')
      }catch(e){
        console.log('Hubo un error al actualizar la dirección ',e)
      }
    }else{
      let errores = errors.errors.reduce(
        (acc, error) => acc + `<p><i class="fas fa-exclamation-triangle"></i>${error.msg}</p>`,' '
      )
      addressUpdated = {...addressUpdated, id: req.params.id}
      res.render('users/editar-direccion', {
        edit: 1,
        ...addressUpdated,
        mensaje: errores,
        warning: true,
        busquedas: seccion.busquedas,
        nuevos: seccion.nuevos,
        userLogged: user
      })
    }
  },

  deleteAddress: async(req, res) => {
    const user = req.session.userLogged
    try{
      await db.direccion.destroy({
        where: {
          id: req.params.id
        }
      })
      await updateUserLogged(user.id,db,req)
      res.redirect('/users')
    }catch(e){
      console.log('Hubo un error al borrar la dirección ', e)
    }
  },

  makeDefaultAddress: async(req, res) => {
    const user = req.session.userLogged
    try{
      await db.usuario.update({
        addressDefault: req.params.id
      },{
        where:{
          id: user.id
        }
      })
    await updateUserLogged(user.id,db,req)
    res.redirect('/users')
    }catch(e){
      console.log('Hubo un error al hacer predeterminada la dirección ', e)
    }
  },

  /** **************************************************/
  /** ************** METHODS FOR REGISTER **************/
  /** **************************************************/
  registerView: (req, res) => {
    res.render('users/register', { userLogged: req.session.userLogged })
  },

  register: async (req, res) => {
    let errors = validationResult(req)
    if (errors.isEmpty()) {
      try {
        let userDBS = await db.usuario.findOrCreate({
          where: {
            email: req.body.email
          },
          defaults: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            imageUser: 'images/userProfile/user-default2.png',
            estado: true
          }
        })
        console.log('Lo que se regresó de la base de datos fue: ', userDBS)

        if (userDBS[1]) {
          console.log('Tu cuenta ha sido creada exitosamente!!')
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
      } catch (error) {
        console.log('Ocurrió un error ', error)
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
        const userToLogin = await db.usuario.findOne({
          include: [{
            model: db.direccion,
            as: 'direcciones',
            include: [{
              model: db.datosFacturacion,
              as: 'facturacion'}]
          }],
          where: { email: req.body.email }
        })
        const isLogged = await bcrypt.compare(req.body.password, userToLogin.password)//Lanza un error si no se encuentra el usuario
        if (isLogged) {
          if (req.body.remember)
            res.cookie('userLogged', userToLogin, {
              maxAge: 1000 * 60 * 60 * 24 * 7,
              httpOnly: true
            })
          req.session.userLogged = userToLogin
          res.redirect('/')
        } else {
          res.render('users/login', {
            mensaje:
              '<p><i class="fas fa-exclamation-triangle"></i>Su contraseña no es correcta. Por favor, intente de nuevo.</p>',
            warning: true,
            oldValues: req.body
          })
        }
      } catch (error) { // Ocurre cuando el usuario no existe
        console.log(error)
        res.render('users/login', {
          mensaje:
            '<p><i class="fas fa-exclamation-triangle"></i>Autenticación fallida. Compruebe que su correo y su contraseña sean correctos.</p>',
          warning: true,
          oldValues: req.body
        })
      }
    } else {
      const errores = errors.errors.reduce(
        (acc, error) => acc + `<p><i class="fas fa-exclamation-triangle"></i>${error.msg}</p>`, '')
      res.render('users/login', {
        mensaje: errores,
        warning: true,
        oldValues: req.body
      })
    }
  },

  logout: (req, res) => {
    delete req.session.userLogged
    res.clearCookie("userLogged");
    res.redirect('/users/login')
  }
}

module.exports = userController

function findIndexById(element, collection) {
  return collection.findIndex(item => element.id === item.id)
}

function saveUserToDB(user) {
  let users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'))
  const index = findIndexById(user, users)
  if (!user.password)
    users[index] = { ...user, password: users[index].password }
  else
    users[index] = user
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2))
}

async function updateUserLogged(userId,db,req){
  req.session.userLogged = await db.usuario.findOne({
    include: [{
      model: db.direccion,
      as: 'direcciones',
      include: [{
        model: db.datosFacturacion,
        as: 'facturacion'}]
    }],
    where: { id: userId }
  })
}