module.exports = (sequelize, dataTypes) => {
    let alias = 'compraLibro';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        cantidad: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        precioUnitarioLibro: {
            type: dataTypes.DECIMAL(10,2),
            allowNull: false
        },
        formato: {
            type: dataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'pasta blanda'
        }
        
    };
    let config = {
        tableName: 'compraLibros',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deleteAt: false
    }

    const CompraLibro = sequelize.define(alias, cols, config);
    CompraLibro.associate = function (models) {
        CompraLibro.belongsTo(models.compra);
        CompraLibro.belongsTo(models.libro);
    }
    return CompraLibro;

}