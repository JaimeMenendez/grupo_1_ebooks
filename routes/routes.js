const path = require('path');
const express = require('express');
const router = express.Router();

router.get("/", (req,res)=>{
    const htmlPath = path.resolve(__dirname, "../views/home.html");
    res.sendFile(htmlPath);
});

router.get("/home", (req,res)=>{
    const htmlPath = path.resolve(__dirname, "../views/home.html");
    res.sendFile(htmlPath);
});

router.get("/PoliticaDePrivacidad", (req,res)=> {
    const htmlPath = path.resolve(__dirname, "../views/PoliticaDePrivacidad.html");
    res.sendFile(htmlPath);
})

router.get("/TerminosyCondiciones", (req,res)=> {
    const htmlPath = path.resolve(__dirname, "../views/TerminosyCondiciones.html");
    res.sendFile(htmlPath);
})

router.get("/carrito", (req,res)=> {
    const htmlPath = path.resolve(__dirname, "../views/carrito.html");
    res.sendFile(htmlPath);
})

router.get("/description", (req,res)=> {
    const htmlPath = path.resolve(__dirname, "../views/description.html");
    res.sendFile(htmlPath);
})

router.get("/login", (req,res)=> {
    const htmlPath = path.resolve(__dirname, "../views/login.html");
    res.sendFile(htmlPath);
})

router.get("/register", (req,res)=> {
    const htmlPath = path.resolve(__dirname, "../views/register.html");
    res.sendFile(htmlPath);
})

router.get("/searchBook", (req,res)=> {
    const htmlPath = path.resolve(__dirname, "../views/searchBook.html");
    res.sendFile(htmlPath);
})


module.exports = router;