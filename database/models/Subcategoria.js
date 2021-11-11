module.exports= (sequelize, dataTypes) => {
    let alias = 'subcategoria';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING(50),
            allowNull: false
        }
    };
    let config = {
        tableName: 'subcategorias',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Subcategoria = sequelize.define(alias,cols,config);
    Subcategoria.associate = function (models) {
        Subcategoria.belongsToMany(models.libro, {
            through: 'libros_subcategorias'
        })
    };
    return Subcategoria;
}