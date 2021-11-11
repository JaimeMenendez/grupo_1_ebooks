module.exports= (sequelize, dataTypes) => {
    let alias = 'Direccion';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        idUsuario:{
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        nombre:{
            type: dataTypes.STRING(100),
            allowNull: false
        },
        pais:{
            type: dataTypes.STRING(50),
            allowNull: false
        },
        ciudad:{
            type: dataTypes.STRING(50),
            allowNull: false
        },
        direccion:{
            type: dataTypes.STRING(100),
            allowNull: false
        },
        colonia:{
            type: dataTypes.STRING(50),
            allowNull: false
        },
        delegacion:{
            type: dataTypes.STRING(50),
            allowNull: false
        },
        cp:{
            type: dataTypes.STRING(5),
            allowNull: false
        },
        telefono:{
            type: dataTypes.STRING(20),
            allowNull: false
        },
        predeterminado:{
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    };
    let config = {
        tableName: 'directiones',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Direccion = sequelize.define(alias,cols,config);
    //Section.associate = function (models) {};
    return Direccion;
}