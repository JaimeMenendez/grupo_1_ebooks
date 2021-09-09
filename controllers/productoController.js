const { readFileSync, writeFileSync } = require('fs')

const productoController = {
  sendProductoID: (req, res) => {
    if (req.params.id) {
      let librosDB = readFileSync('./DB/librosDB.json', 'utf-8')
      librosDB = JSON.parse(librosDB)

      const libroBuscado = librosDB.find((libro) => {
        if (libro.id) {
          return libro.id == req.params.id
        }
        return false
      })
      if (libroBuscado) {
        res.render('products/description', libroBuscado)
      } else {
        res.render('main/error404')
      }
    }
  },

  sendProductoNotFound: (req, res) => {
    res.render('error404')
  },
  agregarLibroView: (req, res) => {
    res.render('products/editar-agregar-producto', {
      tittle: '<i class="fas fa-book"></i>&nbsp Agregar Libro'
    })
  },

  agregarLibro: (req, res) => {
    const newBook = req.body
    newBook.precioBook = Number.parseInt(newBook.precioBook)
    newBook.precioEbook = Number.parseInt(newBook.precioEbook)

    let librosDB = readFileSync('./DB/librosDB.json', 'utf-8')
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
    writeFileSync('./DB/librosDB.json', JSON.stringify(librosDB, null, 2))
    res.redirect('/producto/' + newBook.id)
  },
  editarLibroView: (req, res) => {
    res.render('products/editar-agregar-producto', {
      tittle: '<i class="fas fa-edit"></i>&nbsp Editar Libro'
    })
  }
}

function eliminarImagen(req, index) {
  if (products[index].image !== 'default-image.png') {
    try {
      fs.unlinkSync(path.resolve(productsImageFolder, products[index].image))
    } catch {
      console.log('El archivo no existe')
    }
  }
}

module.exports = productoController
