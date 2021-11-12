module.exports= (sequelize, dataTypes) => {
    let alias = 'datosFacturacion';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        razonSocial:{
            type: dataTypes.STRING(100),
            allowNull: false
        },
        rfc:{
            type: dataTypes.STRING(13),
            allowNull: false
        },
        predeterminado:{
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    };
    let config = {
        tableName: 'datosFacturacion',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Facturacion = sequelize.define(alias,cols,config);
    Facturacion.associate = function (models) {
        Facturacion.belongsTo(models.direccion);
        Facturacion.hasMany(models.compra);
    };
    return Facturacion;
}