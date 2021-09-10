const express = require('express')
const path = require('path')
const router = require('./routes/routes')
const routerUser = require('./routes/rutasUsuarios')
const routerProducto = require('./routes/rutasProducto')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const publicPath = path.resolve(__dirname, './public')
app.use(express.static(publicPath))
app.use('*/css', express.static('public/css'))
app.use('*/js', express.static('public/js'))
app.use('*/images', express.static('public/images'))

// Middleware necesarios para atender solicitudes POST
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Middleware necesario para atender solicitudes PUT y DELETE
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// Routes
app.use('/producto', routerProducto)
app.use('/users', routerUser)
app.use(router)

// Inicia el servidor
const port = process.env.PORT || 3000
app.listen(port, () =>
  console.log('Servidor Corriendo en el puerto', port))
