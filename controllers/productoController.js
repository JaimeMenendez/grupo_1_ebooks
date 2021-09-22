const fs = require('fs');
const path = require('path');
const { readFileSync, writeFileSync, unlinkSync } = require('fs')
const seccion = require("../controllers/secciones.json")

const productsFilePath = path.join(__dirname, '../DB/librosDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let productos = seccion.todosLosProductos;

let nuevosArticulos = products.map(articulo => {
	return articulo = {...articulo, idClass:"", nuevo:false, clasificacion: 3, formato:""}
  })

let seccionProductos = seccion.todosLosProductos;
seccionProductos.articulos = nuevosArticulos;


const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products/products', {seccionProductos: seccionProductos, userLogged: req.session.userLogged})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		if (req.params.id) {
		  let librosDB = readFileSync(productsFilePath, 'utf-8')
		  librosDB = JSON.parse(librosDB)
	
		  const libroBuscado = librosDB.find((libro) => libro.id == req.params.id)
		  if (libroBuscado) {
			res.render('products/description', {...libroBuscado, userLogged: req.session.userLogged})
		  } else {
			res.render('main/error404',{userLogged: req.session.userLogged})
		  }
		}
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
	store: (req, res) => {
		const newBook = req.body
		newBook.precioBook = Number.parseInt(newBook.precioBook)
		newBook.precioEbook = Number.parseInt(newBook.precioEbook)
	
		let librosDB = readFileSync(productsFilePath, 'utf-8')
		librosDB = JSON.parse(librosDB)
	
		const currentMaxId = librosDB[librosDB.length - 1].id
		newBook.id = currentMaxId + 1
		newBook.votos = 0
		newBook.rating = 0
	
		if (req.file) {
		  newBook.portada = req.file.path
		} else {
		  newBook.portada = 'public/images/booksCover/default-image.png'
		}
	
		librosDB.push(newBook)
		writeFileSync(productsFilePath, JSON.stringify(librosDB, null, 2))
		res.redirect('/products/' + newBook.id)
	  },

	// Update - Form to edit
	edit: (req, res) => {
		if (req.params.id) {
		  let librosDB = readFileSync(productsFilePath, 'utf-8')
		  librosDB = JSON.parse(librosDB)
	
		  const libroBuscado = librosDB.find((libro) => libro.id == req.params.id)
		  if (libroBuscado) {
			res.render('products/editar-agregar-producto', {
			  ...libroBuscado,
			  tittle: '<i class="fas fa-edit"></i>&nbsp Editar Libro',
			  edit: true,
			  userLogged: req.session.userLogged
			})
		  } else {
			res.render('main/error404',{userLogged: req.session.userLogged})
		  }
		}
	  },
	// Update - Method to update
	update: (req, res) => {
		let id = req.params.id;
		let index = products.findIndex(product => product.id == id)

		if(index >= 0){
			let productToEdit = {
				id: products[index].id,
				...req.body,
				portada: products[index].portada
			}

			if(req.file){
				productToEdit.portada = req.file.path
			} 
			
			products[index] = productToEdit
	
			fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
			res.redirect('/products/'+ id);
		}
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		if (req.params.id) {
			let librosDB = readFileSync(productsFilePath, 'utf-8')
			librosDB = JSON.parse(librosDB)
			const libroParaEliminar = librosDB.findIndex((libro) => libro.id == req.params.id)
			if (libroParaEliminar >= 0) {
				librosDB.splice(libroParaEliminar,1)
				fs.writeFileSync(productsFilePath, JSON.stringify(librosDB, null, ' '));
				res.redirect('/home');
			} else {
			  res.render('main/error404',{userLogged: req.session.userLogged})
			}
		  }
		  else{
			res.render('main/error404',{userLogged: req.session.userLogged})
		  }
		},
		/**
		 * Esta función maneja la vista de 
		 * @param {*} req 
		 * @param {*} res 
		 */
		libro: (req, res) => {
			let librosDB = readFileSync(productsFilePath, 'utf-8')
			librosDB = JSON.parse(librosDB)
			res.render('products/libros', {libros:librosDB})
		}

}

module.exports = controller;
