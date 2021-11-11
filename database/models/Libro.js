module.exports= (sequelize, dataTypes) => {
    let alias = 'libro';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        titulo:{
            type: dataTypes.STRING(100),
            allowNull: false
        },
        autor:{
            type: dataTypes.STRING(100),
            allowNull: false
        },
        editorial:{
            type: dataTypes.STRING(50),
            allowNull: false
        },
        isnb:{
            type: dataTypes.STRING(13),
            allowNull: false
        },
        precioEbook:{
            type: dataTypes.DOUBLE,
            allowNull: false
        },
        precioBook:{
            type: dataTypes.DOUBLE,
            allowNull: true
        },
        idioma:{
            type: dataTypes.STRING(50),
            allowNull: false
        },
        year:{
            type: dataTypes.STRING(4),
            allowNull: false
        },
        edicion:{
            type: dataTypes.STRING(50),
            allowNull: false
        },
        detallesLibro:{
            type: dataTypes.STRING(500),
            allowNull: false
        },
        detallesAutor:{
            type: dataTypes.STRING(500),
            allowNull: false
        },
        puntuacion:{
            type: dataTypes.DOUBLE,
            allowNull: false
        },
        puntuacion:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        disponible:{
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    };
    let config = {
        tableName: 'libros',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Libro = sequelize.define(alias,cols,config);
    Libro.associate = function (models) {
        Libro.belongsToMany(models.usuario, {
            through: 'favoritos'
        })
    };
    return Libro;
}