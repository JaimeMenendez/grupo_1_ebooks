module.exports = (sequelize, dataTypes) => {
    let alias = 'metodoDePago';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        metodo: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
    };
    let config = {
        tableName: 'metodosDePagos',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deleteAt: false
    }

    const MetodoDePago = sequelize.define(alias, cols, config);
    MetodoDePago.associate = function (models) {
        MetodoDePago.hasMany(models.compra);
    }
    return MetodoDePago;

}