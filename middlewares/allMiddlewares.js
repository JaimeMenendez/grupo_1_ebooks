const bcrypt = require('bcryptjs')
const {body, check} = require('express-validator')

const middleware = {

    validarInvoice: [
        body('razonSocial').notEmpty().withMessage("Debe especificar la razón social o el nombre de la persona"),
        body('rfc').notEmpty().withMessage("Debe especificar el RFC de la empresa o persona").bail()
                   .isLength({ min: 12 }).withMessage("EL RFC debe tener mínimo 12 caracteres para personas morales y 13 caracteres para personas físicas").bail()
                   .isAlphanumeric().withMessage("EL RFC debe contener caracteres alfanuméricos"),
        body('idDireccion').notEmpty().withMessage("Debe seleccionar una dirección de la lista o seleccionar la opción de 'Agregar una nueva dirección'")
                           .custom((value, {req}) => {
                                if(value == '0'){
                                    throw new Error("La dirección no puede estar vacía. Debe seleccionar una dirección de la lista o seleccionar la opción de 'Agregar una nueva dirección'")  
                                }
                                return true
                            }),
    ],

    validarDireccion: [
        body('nombre').notEmpty().withMessage("Debe especificar un nombre"),
        body('pais').notEmpty().withMessage("Debe seleccionar un país de la lista "),
        body('estado').notEmpty().withMessage("Debe especificar el estado"),
        body('ciudad').notEmpty().withMessage("Debe especificar una ciudad "),
        body('direccion').notEmpty().withMessage("Debe especificar una dirección"),
        body('colonia').notEmpty().withMessage("Debe especificar una colonia"),
        body('delegacion').notEmpty().withMessage("Debe especificar una delegación"),
        body('codigoPostal').notEmpty().withMessage("Debe especificar el código postal")
                        .isNumeric().withMessage("El código postal debe ser un número"),
        body('telefono').isNumeric().withMessage("Debe especificar un número de teléfono")
                        .isLength({ min: 8, max: 12 }).withMessage("El número de teléfono debe tener mínimo 8 números y máximo 12 números incluido el indicativo del país")                 
    ],

    validarRegistro: [
        body('firstName').notEmpty().isLength({ min: 2 }).withMessage("Debe especificar su nombre."),
        body('lastName').notEmpty().isLength({ min: 2 }).withMessage("Debe especificar sus apellidos."),
        body('email').notEmpty().withMessage("Debe especificar un email.").bail()
                      .isEmail().withMessage('Debe introducir un email válido.'),
        body('password').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage("La contraseña debe tener una letra en minúscula, una letra en mayúscula, un número y al menos 8 caracteres.")
    ],

    validarLogin: [
        body('email').notEmpty().withMessage("Debe especificar un email.").bail()
                     .isEmail().withMessage('Debe introducir un email válido.'),
        body('password').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage("La contraseña no es correcta, por favor, intente nuevamente.")
    ],

    validarDataUser: [
        body('nombre').notEmpty().isLength({ min: 2 }).withMessage("Debe especificar su nombre"),
        body('apellido').notEmpty().isLength({ min: 2 }).withMessage("Debe especificar su apellido"),
        body('correo').notEmpty().withMessage("Debe especificar un email")
                    .isEmail().withMessage("Debe especificar un email válido")  
    ],

    validarDataUserPassword: [
        body('cambiarContraseña').notEmpty().withMessage("Debe seleccionar una opción en 'Cambiar contraseña'"),                             
        body('contraseña').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage("La contraseña debe tener una letra en minúscula, una letra en mayúscula, un número y al menos 8 caracteres."),
        body('confContraseña').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage("La confirmación de la contraseña debe tener una letra en minúscula, una letra en mayúscula, un número y al menos 8 caracteres.")
                           .custom((value, {req}) => {
                                if(value !== req.body.contraseña){
                                    console.log('Values es igual a: ', value)
                                    throw new Error('La nueva contraseña y su confirmación no son iguales')  
                                }
                                return true
                            }),
        body('contraseñaActual').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/).withMessage("La contraseña actual debe tener una letra en minúscula, una letra en mayúscula, un número y al menos 8 caracteres.")
                            .custom((value, {req}) => {
                                const user = req.session.userLogged
                                let check = bcrypt.compareSync(value,user.password)
                                if(!check){
                                    throw new Error('La contraseña actual ingresada no es igual a la contraseña actual')
                                }else{
                                    if(value === req.body.contraseña){
                                        throw new Error('La nueva contraseña debe ser diferente a la contraseña actual')
                                    }
                                }
                                return true
                            })
    ],
    validarLibro: [
        check('nombreLibro')
        .notEmpty().withMessage("Debe especificar un título").bail()
        .isLength({ min: 5 }).withMessage("El título debe tener al menos 5 caracteres"),

        check('autor').notEmpty().withMessage("Debe especificar un autor"),

        check("categoria").notEmpty().withMessage("Debe especificar una categoría"),

        check("subcategoria").notEmpty().withMessage("Debe especificar una subcategoría"),

        check("isbn").notEmpty().withMessage("Debe especificar un isbn"),

        check('editorial').notEmpty().withMessage("Debe especificar una editorial"),

        check("precioEbook").notEmpty().withMessage("Debe especificar un precio para el libro electrónico.").bail()
        .isNumeric().withMessage("El precio del libro electrónico debe ser un número"),

        check("paginas").notEmpty().withMessage("Debe especificar un número de páginas").bail().isNumeric().withMessage("El número de páginas debe ser un número"),

        check("precioBook").notEmpty().withMessage("Debe especificar un precio para el libro").bail()
        .isNumeric().withMessage("El precio del libro debe ser un número"),
        check("detallesAutor").notEmpty().withMessage("Debe especificar los detalles del autor").bail()
        .isLength({ min: 5 }).withMessage("Los detalles del autor deben tener un mínimo de 5 caracteres."),

        check("detallesDelLibro").notEmpty().withMessage("Debe especificar los detalles del libro").bail()
        .isLength({ min: 5 }).withMessage("Los detalles del libro deben tener un mínimo de 5 caracteres."),
    ]

}

module.exports = middleware