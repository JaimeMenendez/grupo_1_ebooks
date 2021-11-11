module.exports = (sequelize, dataTypes) => {
    let alias = 'Review';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        contenido: {
            type: dataTypes.STRING(1000),
            allowNull: true
        },
        rating: {
            type: dataTypes.DECIMAL(3,1),
            allowNull: false
        },
        idUsuario: {
            type: dataTypes.INTEGER(10),
            allowNull: false
        },
        idLibro: {
            type: dataTypes.INTEGER(10),
            allowNull: false,
        }
    };
    let config = {
        tableName: 'reviews',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deleteAt: false
    }

    const Review = sequelize.define(alias, cols, config);
    // Review.associate = function (models) {}
    return Review;

}