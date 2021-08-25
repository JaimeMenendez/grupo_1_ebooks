const path = require('path');
const book = require('./libro.json');
const carrito = require('./carrito.json');
const section = require('./section.json');
const { readFileSync, writeFileSync } = require('fs');

const controller = {
    sendHome: (req, res) => {
        res.render("home", section);
    },
    sendPoliticaDePrivacidad: (req, res) => {
        res.render("documento", { documento: "./partials/politica" });
    },
    sendTerminosyCondiciones: (req, res) => {
        res.render("documento", { documento: "./partials/terminos" });
    },
    sendShoppingCart: (req, res) => {
        res.render("carrito", carrito);
    },
    sendProductDescription: (req, res) => {
        res.render("description", book);
    },
    sendLogin: (req, res) => {
        const htmlPath = path.resolve(__dirname, "../views/login.html");
        res.sendFile(htmlPath);
    },
    sendRegister: (req, res) => {
        const htmlPath = path.resolve(__dirname, "../views/register.html");
        res.sendFile(htmlPath);
    },
    sendSearchPage: (req, res) => {
        res.render("searchBook", section);
    },
    agregarLibroView: (req, res) => {
        res.render("agregarLibro", book);
    },
    sendPageNotFound: (req, res) => {
        res.render("error404", book);
    },
    agregarLibro: (req,res) =>{
        let librosDB = readFileSync('./DB/librosDB.json','utf-8');
        if(librosDB == ""){
            librosDB = [];
        }else{
            librosDB = JSON.parse(librosDB);
        }

        let newBook = req.body;
        newBook.id = librosDB[0].id_count + 1
        librosDB[0].id_count = librosDB[0].id_count + 1
        if(req.file){
            newBook.portada = req.file.path;
        }
        
        librosDB.push(newBook)
        writeFileSync('./DB/librosDB.json',JSON.stringify(librosDB, null, 2),'utf-8') 
        res.render('agregarLibro');
    }
}

module.exports = controller;