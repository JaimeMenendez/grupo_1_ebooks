module.exports = (sequelize, dataTypes) => {
    let alias = 'Compra';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primarykey: true,
            allowNull: false,
            autoIncrement: true
        },
        codigoFactura: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        idUsuario: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        idDatosFacturacion: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        idMetodoPago: {
            type: dataTypes.INTEGER(10),
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
    // Compra.associate = function (models) {}
    return Compra;

}