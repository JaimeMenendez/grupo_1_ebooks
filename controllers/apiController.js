const db = require('../database/models')
//const Op = db.Sequelize.Op

const apiController = {
    
    products: async(req,res) => {
        try{
            var { page } = req.query;
            var size = 10
            page = parseInt(page)

            let books = await db.libro.findAndCountAll({
                include: [{
                    model: db.categoria
                }],
                where: {
                    [db.Sequelize.Op.or]: [
                        {nombreLibro: {[db.Sequelize.Op.like]: `%${req.query.search}%`}},
                        {autor: {[db.Sequelize.Op.like]: `%${req.query.search}%`}},
                        {isbn: {[db.Sequelize.Op.like]: `%${req.query.search}%`}},
                        {detallesDelLibro: {[db.Sequelize.Op.like]: `%${req.query.search}%`}},
                        {detallesAutor: {[db.Sequelize.Op.like]: `%${req.query.search}%`}}
                    ]
                },
                limit: size,
                offset: page * size
            })
            console.log(books.rows)
            const totalPages = Math.ceil(books.count/size)
            return res.json({
                count: books.count,
                Error: books.count == 0 ? true : false,
                pagination: {
                    totalPages: totalPages,
                    limit: size,
                    nextPage: page >= 0 && page <totalPages-1?`http://localhost:3000/api/products?page=${page+1}`:'',
                    previousPage: page > 0 && page <= totalPages ? `http://localhost:3000/api/products?page=${page-1}`:'',
                },
                books: books.rows.map(book => {
                    return {
                        id: book.id,
                        name: book.nombreLibro,
                        description: book.detallesDelLibro,
                        category: book.categoria.map(categoria => categoria.nombre),
                        imageBook: "http://localhost:3000/"+ book.portada,
                        detail: 'http://localhost:3000/api/products/' + book.id
                    }
                }), 
                status: 200
            })
        }catch(e){console.log(e)}
    },
    productDetail: async (req,res) =>{
        try{
            let book = await db.libro.findByPk(req.params.id,{
                include: [{
                    model: db.categoria
                }]
            })
            book = JSON.parse(JSON.stringify(book));
            let categoria = book.categoria
            let portada = book.portada
            delete book.portada
            delete book.precioEbook
            delete book.categoria
            return res.status(200).json({
                book: book,
                category: categoria.map(categoria => categoria.nombre),
                imageBook: "http://localhost:3000/"+ portada,
                status: 200
            })
        }catch(e){console.log(e)}
    },
    
   /*  create: (req, res) => {
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
     */
    users: async(req,res)=>{
        try{
            var { page } = req.query;
            var size = 10
            page = parseInt(page)

            let users = await db.usuario.findAndCountAll({
                limit: size,
                offset: page*size
            })
            const totalPages = Math.ceil(users.count/size)
            return res.json({
                count: users.count,
                pagination: {
                    totalPages: totalPages,
                    limit: size,
                    nextPage: page >= 0 && page<totalPages-1?`http://localhost:3000/api/users?page=${page+1}`:'',
                    previousPage: page > 0 && page <= totalPages ? `http://localhost:3000/api/users?page=${page-1}`:'',
                },
                users: users.rows.map(user => {
                    return {
                        id: user.id,
                        name: user.firstName + user.lastName,
                        email: user.email,
                        detail: 'http://localhost:3000/api/users/' + user.id 
                    }
                }),
                status: 200
            }) 
        }catch(e){console.log(e)}
    },
    
    userDetail: async(req,res)=>{
        try{
            let user = await db.usuario.findOne({
                include: [{
                    model: db.direccion,
                    as: 'direcciones',
                    include: [{
                        model: db.datosFacturacion,
                        as: 'facturacion'
                    }]
                }], where: { id: req.params.id },
            })
            if(user.addressDefault != 0){
                let address = user.direcciones.find(direccion => direccion.dataValues.id == user.addressDefault)
                address= JSON.parse(JSON.stringify(address))
                delete address.facturacion 
                user.addressDefault = address
            }
            if(user.invoiceDefault != 0){
                let addressInvoice = user.direcciones.find(d => d.dataValues.facturacion.find(i=> i.dataValues.id == user.invoiceDefault) != undefined) 
                let invoice = addressInvoice.dataValues.facturacion.find(i => i.dataValues.id == user.invoiceDefault)
                user.invoiceDefault = invoice.dataValues
            }
            user = JSON.parse(JSON.stringify(user));
            let image = user.imageUser
            delete user.password; 
            delete user.estado;
            delete user.imageUser;
            delete user.rolId;
            return res.json({
                user: user, 
                imageUser: "http://localhost:3000/"+ image,
                status: 200
            })
        }catch(e){console.log(e)}

    },
    sendPageNotFound: (res)=>{
        res.status(404).send("Recurso no encontrado!!!")
    }
}

module.exports = apiController;