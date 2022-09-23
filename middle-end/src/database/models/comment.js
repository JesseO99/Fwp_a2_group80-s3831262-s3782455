const { INTEGER } = require("sequelize");

module.exports = (sequelize, DataTypes) => 
    sequelize.define("comment", { 
        comment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        post_id: {
          type: DataTypes.INTEGER,
          allowNull: false  
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment_content: {
            type: DataTypes.STRING(600),
            allowNull: false
        }
    },{
        timestamps: false
    })