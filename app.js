const express = require("express");
const path = require("path");
const router = require("./routes/routes");

const app = express();

app.set('view engine', 'ejs');

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

// Middleware necesarios para atender solicitudes POST
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware necesario para atender solicitudes PUT y DELETE
const methodOverride = require("method-override");
app.use(methodOverride('_method'))

// Routes
app.use(router);

// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, ()=>
    console.log("Servidor Corriendo en el puerto",port));
