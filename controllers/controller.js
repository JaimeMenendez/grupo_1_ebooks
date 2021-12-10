const book = require('./libro.json')
const path = require('path');
const fs = require('fs');
//const carrito = require('./carrito.json')
const seccion = require('./secciones.json')
const categorias = require('./categorias.json')
const botonesPrincipales = require('./botonesPrincipales.json')

const productsFilePath = path.join(__dirname, '../DB/librosDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let articulosDB = function(idClass,nuevo,formato){ 
  return products.map(articulo => {
	return articulo = {...articulo, idClass:idClass, nuevo:nuevo, clasificacion: 3, formato:formato}
  })
}

let articulos = articulosDB("",false,"")
let tamaño = articulos.length

seccion.tendencias.articulos = articulos.filter(articulo => articulo.id<=tamaño && articulo.id > (tamaño-8));
seccion.recomendados.articulos = articulos.filter(articulo => articulo.id<= 8 && articulo.id > 0);
seccion.nuevos.articulos = articulosDB("",true,"").filter(articulo => articulo.id<= 16 && articulo.id > 8);
seccion.ebooks.articulos = articulosDB("",false,"ebook").filter(articulo => articulo.id<= 18 && articulo.id > 10);
seccion.resultados.articulos = articulosDB("",false,"ebook").filter(articulo => articulo.id<= (tamaño-5) && articulo.id > 0);

const controller = {
  sendHome: (req, res) => {
    res.render('main/home', { seccion: seccion, categorias: categorias, botonesPrincipales: botonesPrincipales,userLogged: req.session.userLogged })
  },
  sendPoliticaDePrivacidad: (req, res) => {
    res.render('main/documento', { documento: '../partials/politica',userLogged: req.session.userLogged })
  },
  sendTerminosyCondiciones: (req, res) => {
    res.render('main/documento', { documento: '../partials/terminos',userLogged: req.session.userLogged })
  },
  sendSearchPage: (req, res) => {
    const buttonPressed = 'searchBook'
    res.render('main/searchBook', { seccion: seccion, categorias: categorias, buttonPressed: buttonPressed, userLogged: req.session.userLogged })
  },
  sendCategoryButtons: (req, res) => {
    const buttonPressed = categorias.categoriasDeBotones.find(boton => boton.idClass === req.params.buttonId)
    res.render('main/searchBook', { seccion: seccion, categorias: categorias, buttonPressed: buttonPressed,userLogged: req.session.userLogged })
  },
  sendPageNotFound: (req, res) => {
    res.render('main/error404',{userLogged: req.session.userLogged})
  }
}

module.exports = controller
