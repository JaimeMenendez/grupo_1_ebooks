module.exports = (sequelize, dataTypes) => {
    let alias = 'carrito';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        cantidad: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
            default: 1
        },
        // 0 Pasta blanda; 1 Ebook
        formato: {
            type: dataTypes.INTEGER,
            allowNull: false,
            default: 0
        }
    };
    let config = {
        tableName: 'carrito',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deleteAt: false
    }

    const Carrito = sequelize.define(alias, cols, config);
    Carrito.associate = function (models) {
        Carrito.belongsTo(models.libro);
        Carrito.belongsTo(models.usuario);
    }
    return Carrito;
}