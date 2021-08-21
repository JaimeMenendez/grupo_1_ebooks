const path = require('path');
const book = require('./libro.json')
const carrito = require('./carrito.json')

const controller = {
    sendHome: (req,res)=>{
        const htmlPath = path.resolve(__dirname, "../views/home.html");
        res.sendFile(htmlPath);
    },
    sendPoliticaDePrivacidad:(req,res)=> {
        const htmlPath = path.resolve(__dirname, "../views/PoliticaDePrivacidad.html");
        res.sendFile(htmlPath);
    },
    sendTerminosyCondiciones: (req,res)=> {
        const htmlPath = path.resolve(__dirname, "../views/TerminosyCondiciones.html");
        res.sendFile(htmlPath);
    },
    sendShoppingCart: (req,res)=> {
        res.render("carrito",carrito);
    },
    sendProductDescription:(req,res)=> {
        res.render("description",book);
    },
    sendLogin: (req,res)=> {
        const htmlPath = path.resolve(__dirname, "../views/login.html");
        res.sendFile(htmlPath);
    },
    sendRegister: (req,res)=> {
        const htmlPath = path.resolve(__dirname, "../views/register.html");
        res.sendFile(htmlPath);
    },
    sendSearchPage: (req,res)=> {
        const htmlPath = path.resolve(__dirname, "../views/searchBook.html");
        res.sendFile(htmlPath);
    }
}

module.exports = controller