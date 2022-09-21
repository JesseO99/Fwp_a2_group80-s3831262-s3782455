module.exports = (sequelize, DataTypes) => 
    sequelize.define("sub_comment", { 
        sub_comment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        comment_id: {
          type: DataTypes.INTEGER,
          allowNull: false  
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sub_comment_content: {
            type: DataTypes.STRING(600),
            allowNull: false
        }
    })