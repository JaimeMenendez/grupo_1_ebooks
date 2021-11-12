module.exports= (sequelize, dataTypes) => {
    let alias = 'direccion';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        pais: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        ciudad: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        direccion: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        colonia: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        delegacion: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        codigoPostal: {
            type: dataTypes.STRING(10),
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        telefono: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        predeterminado: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    };
    let config = {
        tableName: 'directiones',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Direccion = sequelize.define(alias, cols, config);
    Direccion.associate = function (models) {
        Direccion.belongsTo(models.usuario, {
            as: 'usuarios',
            foreignKey: 'idUsuario'
        });
        Direccion.hasMany(models.datosFacturacion)
    };
    return Direccion;
}