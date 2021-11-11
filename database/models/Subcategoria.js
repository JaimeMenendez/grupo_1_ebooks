module.exports= (sequelize, dataTypes) => {
    let alias = 'subsection';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name:{
            type: dataTypes.STRING(50),
            allowNull: false
        }
    };
    let config = {
        tableName: 'subsections',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Section = sequelize.define(alias,cols,config);
    //Section.associate = function (models) {};
    return Section;
}