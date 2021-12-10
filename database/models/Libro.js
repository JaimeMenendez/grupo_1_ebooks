module.exports= (sequelize, dataTypes) => {
    let alias = 'libro';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombreLibro:{
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
        isbn:{
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
        paginas:{
            type: dataTypes.INTEGER(10),
            allowNull: false    
        },
        detallesDelLibro:{
            type: dataTypes.STRING(2000),
            allowNull: false
        },
        detallesAutor:{
            type: dataTypes.STRING(2000),
            allowNull: false
        },
        portada:{
            type: dataTypes.STRING(500),
            allowNull: true
        },
        puntuacion:{
            type: dataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        disponible:{
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
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

        Libro.belongsToMany(models.subcategoria, {
            through: 'libros_subcategorias'
        })

        Libro.belongsToMany(models.categoria, {
            through: 'libros_categorias'
        })

        Libro.hasMany(models.compraLibro);
        
        Libro.hasMany(models.carrito);
    };
    return Libro;
}