const Sequelize = require('sequelize')

module.export= (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: Sequelize.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        firstName:{
            type: Sequelize.STRING(50),
            allowNull: false
        },
        lastName:{
            type: Sequelize.STRING(50),
            allowNull: false
        },
        email:{
            type: Sequelize.STRING(100),
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password:{
            type: Sequelize.STRING(100),
            allowNull: false
        },
        role:{
            type: Sequelize.STRING(50),
            allowNull: false
        },
        avatar:{
            type: Sequelize.STRING(100),
            allowNull: true
        },
    };
    let config = {
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }

    const Section = sequelize.define(alias,cols,config);
    //Section.associate = function (models) {};
    return Section;
}