// Model for sections 
const Sequelize = require('sequelize')

module.export= (sequelize, dataTypes) => {
    let alias = 'section';
    let cols = {
        id: {
            type: Sequelize.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name:{
            type: Sequelize.STRING(50),
            allowNull: false
        }
    };
    let config = {
        tableName: 'sections',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Section = sequelize.define(alias,cols,config);
    //Section.associate = function (models) {};
    return Section;
}