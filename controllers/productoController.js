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
    res.render('agregarLibro', { tittle: '<i class="fas fa-book"></i>&nbsp Agregar Libro' })
  },

  agregarLibro: (req, res) => {
    let librosDB = readFileSync('./DB/librosDB.json', 'utf-8')
    if (librosDB == '') {
      librosDB = []
    } else {
      librosDB = JSON.parse(librosDB)
    }

    const newBook = req.body
    newBook.id = librosDB[0].id_count + 1
    librosDB[0].id_count = librosDB[0].id_count + 1
    if (req.file) {
      newBook.portada = req.file.path
    }

    librosDB.push(newBook)
    writeFileSync('./DB/librosDB.json', JSON.stringify(librosDB, null, 2), 'utf-8')
    res.render('agregarLibro', { tittle: '<i class="fas fa-plus-circle"></i>&nbsp Agregar Libro' })
  },
  editarLibroView: (req, res) => {
    res.render('agregarLibro', { tittle: '<i class="fas fa-edit"></i>&nbsp Editar Libro' })
  }
}

module.exports = productoController
