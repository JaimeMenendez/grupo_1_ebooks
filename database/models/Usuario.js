<<<<<<< HEAD
module.exports= (sequelize, dataTypes) => {
    let alias = 'Usuario';
=======
module.exports = (sequelize, dataTypes) => {
    let alias = 'usuario';
>>>>>>> 5b2d7593fa5cc881f3a61ab66278e433498961a9
    let cols = {
        idUsuario: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        apellidos: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        correo: {
            type: dataTypes.STRING(50),
            allowNull: false,
            validate: {
                isEmail: { args: true, msg: 'El correo no es valido' }
            }
        },
        password: {
            type: dataTypes.STRING(50),
            allowNull: false,
            validate: {
                is: {
                    args: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                    msg: 'La contraseña debe tener una letra en minúscula, una letra en mayúscula, un número y al menos 8 caracteres.'
                }
            }
        },
        rol: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING(200),
            allowNull: true
        },
        estado: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    };
    let config = {
        tableName: 'usuarios',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Usuario = sequelize.define(alias, cols, config);
    Usuario.associate = function (models) {
        Usuario.associate = function (models) {
            Usuario.hasMany(models.direccion, {
                as: 'direcciones',
                foreignKey: 'idUsuario'
            });
        }
    };
    return Usuario;
}