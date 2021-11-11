module.exports= (sequelize, dataTypes) => {
    let alias = 'Usuario';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre:{
            type: dataTypes.STRING(50),
            allowNull: false
        },
        apellidos:{
            type: dataTypes.STRING(50),
            allowNull: false
        },
        correo:{
            type: dataTypes.STRING(50),
            allowNull: false
        },
        password:{
            type: dataTypes.STRING(50),
            allowNull: false
        },
        rol:{
            type: dataTypes.STRING(50),
            allowNull: false
        },
        avatar:{
            type: dataTypes.STRING(200),
            allowNull: true
        },
        estado:{
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    };
    let config = {
        tableName: 'usuarios',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Usuario = sequelize.define(alias,cols,config);
    //Section.associate = function (models) {};
    return Usuario;
}