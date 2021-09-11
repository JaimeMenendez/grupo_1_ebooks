const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../DB/librosDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {
			products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let id = req.params.id
		let product = products.find(product => product.id == id)
		res.render('description', {
			product,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('agregarLibro')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let image
		console.log(req.files);
		if(req.files[0] != undefined){
			image = req.files[0].filename
		} else {
			image = 'default-image.png'
		}
		let newProduct = {
			id: products[products.length - 1].id + 1,
			...req.body,
			image: image
		};
		products.push(newProduct)
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/');
	},

	// Update - Form to edit
	edit: (req, res) => {
		let id = req.params.id
		let productToEdit = products.find(product => product.id == id)
		res.render('editar-agregar-producto', {productToEdit})
	},
	// Update - Method to update
	update: (req, res) => {
		let id = req.params.id;
		let productToEdit = products.find(product => product.id == id)
		let image

		if(req.files[0] != undefined){
			image = req.files[0].filename
		} else {
			image = productToEdit.image
		}

		productToEdit = {
			id: productToEdit.id,
			...req.body,
			image: image,
		};
		
		let newProducts = products.map(product => {
			if (product.id == productToEdit.id) {
				return product = {...productToEdit};
			}
			return product;
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
		res.redirect('/');
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let id = req.params.id
		const productoAEliminar = products.findIndex(producto => id == producto.id)
		if(productoAEliminar >= 0)
		{
			products.splice(productoAEliminar, 1)
			fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2),'utf-8')
			res.redirect('/products')
		} else
			res.redirect('/products')
	}

};

module.exports = controller;

// PREVIOUS CONTROLLER

// const { readFileSync, writeFileSync, unlinkSync } = require('fs')

// const productoController = {
//   sendProductoID: (req, res) => {
//     if (req.params.id) {
//       let librosDB = readFileSync('./DB/librosDB.json', 'utf-8')
//       librosDB = JSON.parse(librosDB)

//       const libroBuscado = librosDB.find((libro) => libro.id == req.params.id)
//       if (libroBuscado) {
//         res.render('products/description', libroBuscado)
//       } else {
//         res.render('main/error404')
//       }
//     }
//   },

//   sendProductoNotFound: (req, res) => {
//     res.render('error404')
//   },
//   agregarLibroView: (req, res) => {
//     res.render('products/editar-agregar-producto', {
//       tittle: '<i class="fas fa-book"></i>&nbsp Agregar Libro',
//       edit: false
//     })
//   },

//   agregarLibro: (req, res) => {
//     const newBook = req.body
//     newBook.precioBook = Number.parseInt(newBook.precioBook)
//     newBook.precioEbook = Number.parseInt(newBook.precioEbook)

//     let librosDB = readFileSync('./DB/librosDB.json', 'utf-8')
//     librosDB = JSON.parse(librosDB)

//     const currentMaxId = librosDB[librosDB.length - 1].id
//     newBook.id = currentMaxId + 1
//     newBook.votos = 0
//     newBook.rating = 0

//     if (req.file) {
//       newBook.portada = req.file.path
//     } else {
//       newBook.portada = 'public/images/booksCover/default-image.png'
//     }

//     librosDB.push(newBook)
//     writeFileSync('./DB/librosDB.json', JSON.stringify(librosDB, null, 2))
//     res.redirect('/producto/' + newBook.id)
//   },
//   editarLibroView: (req, res) => {
//     if (req.params.id) {
//       let librosDB = readFileSync('./DB/librosDB.json', 'utf-8')
//       librosDB = JSON.parse(librosDB)

//       const libroBuscado = librosDB.find((libro) => libro.id == req.params.id)
//       if (libroBuscado) {
//         res.render('products/editar-agregar-producto', {
//           ...libroBuscado,
//           tittle: '<i class="fas fa-edit"></i>&nbsp Editar Libro',
//           edit: true
//         })
//       } else {
//         res.render('main/error404')
//       }
//     }
//   }
// }

// module.exports = productoController