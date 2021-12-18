const db = require('../database/models')
const Op = db.Sequelize.Op

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
                total: users.length,
                data: users,
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
                }],
                where: {
                    id: req.params.id
                }
            })
            return res.json({
                data: user.firstName,
                status: 200
            })
        }catch(e){console.log(e)}
    },
    sendPageNotFound: (req,res)=>{
        res.status(200).send("Recurso no encontrado!!!")
    }
}

module.exports = apiController;