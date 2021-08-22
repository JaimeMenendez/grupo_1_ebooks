const express = require("express");
const path = require("path");
const router = require("./routes/routes");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const publicPath = path.resolve(__dirname, "./public");
app.use(express.static(publicPath));

// Routes
app.use(router);

// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, ()=>
    console.log("Servidor Corriendo en el puerto",port));
