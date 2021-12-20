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
    create: (req, res) => {
        res.render('products/editar-agregar-producto', {
            title: '<i class="fas fa-book"></i>&nbsp Agregar Libro',
            edit: false,
            userLogged: req.session.userLogged
        })
    },
    store: async (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            const newBook = req.body
            newBook.precioBook = Number.parseInt(newBook.precioBook)
            newBook.precioEbook = Number.parseInt(newBook.precioEbook)

            // let librosDB = readFileSync(productsFilePath, 'utf-8')
            // librosDB = JSON.parse(librosDB)

            // const currentMaxId = librosDB[librosDB.length - 1].id
            // newBook.id = currentMaxId + 1
            newBook.votos = 0
            newBook.rating = 0

            if (req.file) {
                newBook.portada = req.file.path
            } else {
                newBook.portada = 'public/images/booksCover/default-image.png'
            }

            let libroDB = await db.libro.create(req.body);

            let subcategoria = await db.subcategoria.findOrCreate({
                where: {
                    nombre: req.body.subcategoria
                }
            });

            let categoria = await db.categoria.findOrCreate({
                where: {
                    nombre: req.body.categoria
                }
            });
            await subcategoria[0].addLibro(libroDB);
            await categoria[0].addLibro(libroDB);
            await categoria[0].addSubcategoria(subcategoria[0]);
            res.redirect('/products/')
        } else {
            if (req.file) {
                fs.unlinkSync(req.file.path)
            }
            const errores = errors.errors.reduce(
                (acc, error) => acc + `<p><i class="fas fa-exclamation-triangle"></i>${error.msg}</p>`, '')
            res.render('products/editar-agregar-producto', {
                ...req.body,
                portada: "",
                title: '<i class="fas fa-book"></i>&nbsp Agregar Libro',
                edit: false,
                userLogged: req.session.userLogged,
                mensaje: errores,
                warning: true
            })
        }

    },
    edit: (req, res) => {
        if (req.params.id) {
            db.libro.findByPk(req.params.id, {include: [{model: db.categoria}, {model: db.subcategoria}]})
                .then((libroBuscado) => {
                    res.render('products/editar-agregar-producto', {
                        ...libroBuscado.dataValues,
                        title: '<i class="fas fa-edit"></i>&nbsp Editar Libro',
                        edit: true,
                        userLogged: req.session.userLogged
                    })
                })
        } else {
            res.render('main/error404', {userLogged: req.session.userLogged})
        }
    },
    update: async (req, res) => {
        let id = Number.parseInt(req.params.id);

        if (req.file) {
            req.portada = req.file.path
        }

        let libroDB = await db.libro.update(req.body, {
            where: {id: id}
        });
        libroDB = await db.libro.findByPk(id)

        await libroDB.setCategoria([]);
        await libroDB.setSubcategoria([]);

        let subcategoria = await db.subcategoria.findOrCreate({
            where: {
                nombre: req.body.subcategoria
            }
        });

        let categoria = await db.categoria.findOrCreate({
            where: {
                nombre: req.body.categoria
            }
        });

        await subcategoria[0].addLibro(libroDB);
        await categoria[0].addLibro(libroDB);
        await categoria[0].addSubcategoria(subcategoria[0]);

        res.redirect('/products/' + id);
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
    destroy: async (req, res) => {
        let id = Number.parseInt(req.params.id);
        if (id) {
            await db.libro.destroy({where: {id: id}});
            res.redirect('/products/')
        } else {
            res.render('main/error404', {userLogged: req.session.userLogged})
        }
    },
    libro: (req, res) => {
        let librosDB = readFileSync(productsFilePath, 'utf-8')
        librosDB = JSON.parse(librosDB)
        res.render('products/libros', {libros: librosDB})
    },
    addItemToCar: async (req, res) => {
        try {
            let item = {
                libroId: Number(req.body.libroId),
                usuarioId: req.session.userLogged.id,
                cantidad: Number(req.body.cantidad),
                formato: Number(req.body.formato)
            }

            let itemOnCar = await db.carrito.findOne({
                where: {
                    [db.Sequelize.Op.and]: [
                        {libroId: item.libroId},
                        {usuarioId: item.usuarioId},
                        {formato: item.formato}
                    ]
                }
            })

            item = itemOnCar == null ? item : {
                ...item,
                id: itemOnCar.dataValues.id,
                cantidad: itemOnCar.dataValues.cantidad + item.cantidad
            }

            await db.carrito.upsert({
                ...item
            }, {
                where: {
                    [db.Sequelize.Op.and]: [
                        {libroId: item.libroId},
                        {usuarioId: item.usuarioId},
                        {formato: item.formato},
                    ]
                }
            })

            res.sendStatus(200)
        } catch (e) {
            console.log(e)
            res.sendStatus(400)
        }
    },
    sendShoppingCart: async (req, res) => {
        let carrito = await db.carrito.findAll({
            where: {
                usuarioId: req.session.userLogged.id
            },
            include: db.libro
        })
        res.render('products/carrito', {articulos: carrito, userLogged: req.session.userLogged})
    },
    removeItemFromCar: async (req, res) => {
        let id = Number(req.params.id)
        await db.carrito.destroy({where: {id}})
        res.sendStatus(200)
    },
    changeQuantityInCar: async (req, res) => {
        let id = Number(req.params.id)
        let quantity = Number(req.body.quantity)
        if (!quantity) {
            res.sendStatus(400)
            return
        }
        await db.carrito.update({cantidad: quantity}, {
            where: {
                [db.Sequelize.Op.and]: [
                    {id},
                    {usuarioId: req.session.userLogged.id}
                ]
            }
        })
        res.sendStatus(200)
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