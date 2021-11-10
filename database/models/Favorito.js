module.exports= (sequelize, dataTypes) => {
    let alias = 'Favorito';
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
        idLibro:{
            type: dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    };
    let config = {
        tableName: 'favoritos',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Favoritos = sequelize.define(alias,cols,config);
    //Section.associate = function (models) {};
    return Favoritos;
}