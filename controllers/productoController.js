const fs = require('fs');
const path = require('path');
const { readFileSync, writeFileSync, unlinkSync } = require('fs')
const seccion = require("../controllers/secciones.json");
const { decodeBase64 } = require('bcryptjs');
const db = require('../database/models');
const { Sequelize } = require("../database/models");

const productsFilePath = path.join(__dirname, '../DB/librosDB.json');


const controller = {
    // Root - Show all products
    index: async (req, res) => {
        const products = await db.libro.findAll()
        let nuevosArticulos = products.map(articulo => {
            return { ...articulo.dataValues, idClass: "", nuevo: false, clasificacion: 3, formato: "" }
        })


        let seccionProductos = seccion.todosLosProductos;
        seccionProductos.articulos = nuevosArticulos;
        res.render('products/products', { seccionProductos: seccionProductos, userLogged: req.session.userLogged })
    },

    // Detail - Detail from one product
    detail: (req, res) => {
        db.libro.findByPk(req.params.id, { include: [{ model: db.categoria }, { model: db.subcategoria }] })
            .then((resultado) => {
                res.render('products/description', { ...resultado.dataValues, userLogged: req.session.userLogged })
            })
            .catch(e => { res.render('main/error404', { userLogged: req.session.userLogged }) });
    },

    // Create - Form to create
    create: (req, res) => {
        res.render('products/editar-agregar-producto', {
            tittle: '<i class="fas fa-book"></i>&nbsp Agregar Libro',
            edit: false,
            userLogged: req.session.userLogged
        })
    },

    // Create -  Method to store
    // TODO Validar el guardado de un libro con express validator
    store: async (req, res) => {
        let path = require("path")
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
    },

    // Update - Form to edit
    edit: (req, res) => {
        if (req.params.id) {
            db.libro.findByPk(req.params.id, { include: [{ model: db.categoria }, { model: db.subcategoria }] })
                .then((libroBuscado) => {
                    res.render('products/editar-agregar-producto', {
                        ...libroBuscado.dataValues,
                        tittle: '<i class="fas fa-edit"></i>&nbsp Editar Libro',
                        edit: true,
                        userLogged: req.session.userLogged
                    })
                })
        } else {
            res.render('main/error404', { userLogged: req.session.userLogged })
        }
    },
    // Update - Method to update
    update: async (req, res) => {
        let id = Number.parseInt(req.params.id);

        if (req.file) {
            req.portada = req.file.path
        }

        let libroDB = await db.libro.update(req.body, {
            where: { id: id }
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

    // Delete - Delete one product from DB
    destroy: async (req, res) => {
        let id = Number.parseInt(req.params.id);
        if (id) {
            await db.libro.destroy({ where: { id: id } });
            res.redirect('/products/')
        }
        else {
            res.render('main/error404', { userLogged: req.session.userLogged })
        }
    },
    libro: (req, res) => {
        let librosDB = readFileSync(productsFilePath, 'utf-8')
        librosDB = JSON.parse(librosDB)
        res.render('products/libros', { libros: librosDB })
    },


    // Carrito
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
                        { libroId: item.libroId },
                        { usuarioId: item.usuarioId },
                        { formato: item.formato }
                    ]
                }
            })

            item = itemOnCar == null ? item: {...item, id: itemOnCar.dataValues.id, cantidad:  itemOnCar.dataValues.cantidad + item.cantidad}

            await db.carrito.upsert({
                ...item
            }, {
                where: {
                    [db.Sequelize.Op.and]: [
                        { libroId: item.libroId },
                        { usuarioId: item.usuarioId },
                        { formato: item.formato },
                    ]
                }
            })

            res.sendStatus(200)
        }
        catch (e) {
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
        res.render('products/carrito', { articulos: carrito, userLogged: req.session.userLogged })
    },
    removeItemFromCar: async(req, res) =>{
        let id = Number(req.params.id)
        await db.carrito.destroy({where: {id}})
        res.sendStatus(200)
    }

}

module.exports = controller;
