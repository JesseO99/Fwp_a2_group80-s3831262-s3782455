module.exports = (sequelize, DataTypes) => 
    sequelize.define("post", { 
        post_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false  
        },
        post_content: {
            type: DataTypes.STRING(600),
            allowNull: false
        }
    })