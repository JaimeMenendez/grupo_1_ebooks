module.exports = (sequelize, dataTypes) => {
    let alias = 'Categoria';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primarykey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
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
    // Categoria.associate = function (models) {}
    return Categoria;

}