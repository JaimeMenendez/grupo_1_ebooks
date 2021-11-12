module.exports= (sequelize, dataTypes) => {
    let alias = 'rol';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        nombre:{
            type: dataTypes.STRING(50),
            allowNull: false,
            unique: true
        }
    };
    let config = {
        tableName: 'roles',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Rol = sequelize.define(alias,cols,config);
    Rol.associate = function (models) {
        Rol.hasMany(models.usuario,{foreignKey: {
            allowNull: false,
            defaultValue: 1
          }})
    };
    return Rol;
}