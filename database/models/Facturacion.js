module.exports= (sequelize, dataTypes) => {
    let alias = 'facturacionInfo';
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
        idDireccion:{
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        idUsuario:{
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        predeterminado:{
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    };
    let config = {
        tableName: 'facturacionInfo',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Facturacion = sequelize.define(alias,cols,config);
    //Section.associate = function (models) {};
    return Facturacion;
}