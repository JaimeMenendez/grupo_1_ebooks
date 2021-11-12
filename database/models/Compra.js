module.exports = (sequelize, dataTypes) => {
    let alias = 'compra';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        codigoFactura: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
    };
    let config = {
        tableName: 'compras',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deleteAt: false
    }

    const Compra = sequelize.define(alias, cols, config);
    Compra.associate = function (models) {
        Compra.belongsTo(models.usuario);
        Compra.belongsTo(models.datosFacturacion);
        Compra.belongsTo(models.metodoDePago);
        Compra.hasMany(models.compraLibro);
        // Compra.hasMany(models.ProductoCompra, {
        //     as: 'productos',
        //     foreignKey: 'idCompra'
        // });
    }
    return Compra;

}