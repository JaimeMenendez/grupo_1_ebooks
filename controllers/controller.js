const db = require('../database/models')
const categorias = require('./categorias.json')
const botonesPrincipales = require('./botonesPrincipales.json')

var librosDB; 
var tendencias = {idSection: "tendencias", titulo:'Tendencia en libros...'}
var recomendados = {idSection: "recomendados", titulo: "Libros recomendados..."}
var nuevos = {idSection: "nuevos", titulo:'Los más nuevos...'}
var ebooks = {idSection: "ebooks", titulo:'Libros electrónicos...'}
var resultados = {idSection: "resultados", titulo:'Resultados de la búsqueda...'}
var productos = {idSection: "productos",titulo: "Todos los productos"}
var seccion;

try{
  cargarLibros()
  console.log('lo que tiene seccion', seccion.tendencias)
}catch(e){
  console.log('Ocurrió un error mientras se cargaban los libros: ', e)
}

const controller = {
  sendHome: (req, res) => {
    res.render('main/home', 
    { seccion: {todosLosProductos: productos, tendencias:tendencias,recomendados: recomendados,nuevos: nuevos,ebooks: ebooks,resultados: resultados}, 
      categorias: categorias, 
      botonesPrincipales: botonesPrincipales,
      userLogged: req.session.userLogged })
  },
  sendPoliticaDePrivacidad: (req, res) => {
    res.render('main/documento', 
    { documento: '../partials/politica',
    userLogged: req.session.userLogged })
  },
  sendTerminosyCondiciones: (req, res) => {
    res.render('main/documento', 
    { documento: '../partials/terminos',
    userLogged: req.session.userLogged })
  },
  sendSearchPage: (req, res) => {
    const buttonPressed = 'searchBook'
    res.render('main/searchBook', 
    { seccion: {todosLosProductos: productos, tendencias:tendencias,recomendados: recomendados,nuevos: nuevos,ebooks: ebooks,resultados: resultados}, 
      categorias: categorias, 
      buttonPressed: buttonPressed, 
      userLogged: req.session.userLogged })
  },
  sendCategoryButtons: (req, res) => {
    const buttonPressed = categorias.categoriasDeBotones.find(boton => boton.idClass === req.params.buttonId)
    res.render('main/searchBook', 
    { seccion: {todosLosProductos: productos, tendencias:tendencias,recomendados: recomendados,nuevos: nuevos,ebooks: ebooks,resultados: resultados}, 
      categorias: categorias,
      buttonPressed: buttonPressed,
      userLogged: req.session.userLogged })
  },
  sendPageNotFound: (req, res) => {
    res.render('main/error404',{userLogged: req.session.userLogged})
  }
}

module.exports = controller

async function cargarLibros(){
  librosDB = await db.libro.findAll()
  let tamaño = librosDB.length

  let articulosTendencias = librosDB.filter(articulo => articulo.dataValues.id <= tamaño && articulo.dataValues.id > (tamaño-8))
    .map(articulo => { if(articulo.dataValues.id < (tamaño-4)){ return {...articulo.dataValues, idClass:"", nuevo: false, hidden: true,formato:"",clasificacion: Math.floor((Math.random() * 5)+1)}}
      else{return {...articulo.dataValues, idClass:"", nuevo: false, hidden: false,formato:"",clasificacion: Math.floor((Math.random() * 5)+1)}}})

  let articulosRecomendados = librosDB.filter(articulo => articulo.dataValues.id <= 8 && articulo.dataValues.id > 0)
  .map(articulo => { if(articulo.dataValues.id < 5){return {...articulo.dataValues, idClass:"", nuevo: false, hidden: true,formato:"",clasificacion: Math.floor((Math.random() * 5)+1)}}
    else{return {...articulo.dataValues, idClass:"", nuevo: false, hidden: false,formato:"",clasificacion: Math.floor((Math.random() * 5)+1)}}})

  let articulosEbooks = librosDB.filter(articulo => articulo.dataValues.id <= 18 && articulo.dataValues.id > 10)
      .map(articulo => { if(articulo.dataValues.id < 15){ return {...articulo.dataValues, idClass:"", nuevo: false, hidden: true,formato:"ebook",clasificacion: Math.floor((Math.random() * 5)+1)}}
      else{return {...articulo.dataValues, idClass:"", nuevo: false, hidden: false,formato:"ebook",clasificacion: Math.floor((Math.random() * 5)+1)}}})
  
  let articulosResultados = librosDB.map(articulo => { return {...articulo.dataValues, idClass:"", nuevo: false, hidden: true,formato:"",clasificacion: Math.floor((Math.random() * 5)+1)}})

  let articulosNuevos = librosDB.filter(articulo => articulo.dataValues.id <= 13 && articulo.dataValues.id > 5)
      .map(articulo => { if(articulo.dataValues.id < 9){ return {...articulo.dataValues, idClass:"", nuevo: true, hidden: true,formato:"",clasificacion: Math.floor((Math.random() * 5)+1)}}
      else{return {...articulo.dataValues, idClass:"", nuevo: true, hidden: false,formato:"",clasificacion: Math.floor((Math.random() * 5)+1)}}})
  
  tendencias = {...tendencias, articulos: articulosTendencias}
  recomendados = {...recomendados, articulos: articulosRecomendados}
  nuevos = {...nuevos, articulos: articulosNuevos}
  ebooks = {...ebooks, articulos: articulosEbooks}
  resultados = {...resultados, articulos: articulosResultados}
}