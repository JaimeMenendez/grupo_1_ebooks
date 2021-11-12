module.exports = (sequelize, dataTypes) => {
    let alias = 'categoria';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
    };
    let config = {
        tableName: 'categorias',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deleteAt: false
    }

    const Categoria = sequelize.define(alias, cols, config);
    Categoria.associate = function (models) {
        Categoria.belongsToMany(models.libro, {
            through: 'libros_categorias',
            foreignKey: 'categoria_id'
        })

        Categoria.belongsToMany(models.subcategoria, {
            through: 'categorias_subcategorias',
            foreignKey: 'categoria_id'
        })
    }
    return Categoria;

}