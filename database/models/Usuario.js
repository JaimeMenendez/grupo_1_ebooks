module.exports = (sequelize, dataTypes) => {
    let alias = 'usuario';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        firstName: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        lastName: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: false,
            validate: {
                isEmail: { args: true, msg: 'El correo no es válido' }
            }
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false,
            validate: {
                is: {
                    args: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                    msg: 'La contraseña debe tener una letra en minúscula, una letra en mayúscula, un número y al menos 8 caracteres.'
                }
            }
        },
        imageUser: {
            type: dataTypes.STRING(200),
            allowNull: true
        },
        estado: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        addressDefault: {
            type: dataTypes.INTEGER(10), 
            allowNull: true,
            defaultValue: 0
        },
        invoiceDefault: {
            type: dataTypes.INTEGER(10),
            allowNull: true,
            defaultValue: 0
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
            Usuario.hasMany(models.direccion, {
                as: 'direcciones',
                foreignKey: 'idUsuario'
            });

            Usuario.hasMany(models.compra);

            Usuario.belongsToMany(models.libro, {
                through: 'favoritos'
            })

            Usuario.belongsTo(models.rol);
        }
    return Usuario;
}