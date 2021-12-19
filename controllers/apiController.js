const db = require('../database/models')
const Op = db.Sequelize.Op
var _ = require('underscore')
var _ = require('lodash')
const { values } = require('underscore')

const apiController = {
    products: async(req,res) => {
        try{
            let libros = await db.libro.findAll()
            return res.status(200).json({
                total: libros.length,
                data: libros,
                status: 200,
            })
        }catch(e){console.log(e)}
        _unset
    },
    product: async (req,res) =>{
        try{
            let libro = await db.libro.findByPk(req.params.id)
            return res.status(200).json({
                data: libro,
                status: 200
            })
        }catch(e){console.log(e)}
    },
    users: async(req,res)=>{
        try{
            let users = await db.usuario.findAll()
            return res.status(200).json({
                count: users.length,
                users: users.map(user => {
                    return {
                        id: user.id,
                        name: user.firstName + user.lastName,
                        email: user.email,
                        detail: 'http://localhost:3000/api/users/' + user.id + '/detail'
                    }
                }),
                status: 200
            })
        }catch(e){console.log(e)}
    },
    user: async(req,res)=>{
        try{
            let user = await db.usuario.findOne({
                include: [{
                    model: db.direccion,
                    as: 'direcciones',
                    include: [{
                        model: db.datosFacturacion,
                        as: 'facturacion'
                    }]
                }], where: { id: req.params.id } })
           
            return res.json({
                user: _.omit(user.dataValues,['password','estado','imageUser','rolId']),
                imageUser: "http://localhost:3000/"+user.imageUser,
                status: 200
            })
        }catch(e){console.log(e)}
    },
    userDetail: async(req,res)=>{
        //res.send('Soy el detalle del usuario con id: ' + req.params.id)
        try{
            let user = await db.usuario.findOne({
                include: [{
                    model: db.direccion,
                    as: 'direcciones',
                    include: [{
                        model: db.datosFacturacion,
                        as: 'facturacion'
                    }]
                }], where: { id: req.params.id } })
            if(user.addressDefault != 0){
                let address = user.direcciones.find(direccion => direccion.dataValues.id == user.addressDefault)
                console.log("ADress" , address)
                user.addressDefault = address
            }
            if(user.invoiceDefault != 0){
                let addressInvoice = user.direcciones.find(d => d.dataValues.facturacion.find(i=> i.dataValues.id == user.invoiceDefault) != undefined) 
                let invoice = addressInvoice.dataValues.facturacion.find(i => i.dataValues.id == user.invoiceDefault)
                user.invoiceDefault = invoice.dataValues
            }
            return res.json({
                user: _.omit(user.dataValues,['password','estado','imageUser','rolId','addressDefault.dataValues.facturacion']),
                imageUser: "http://localhost:3000/"+user.imageUser,
                status: 200
            })
        }catch(e){console.log(e)}

    },
    sendPageNotFound: (res)=>{
        res.status(200).send("Recurso no encontrado!!!")
    }
}

module.exports = apiController;