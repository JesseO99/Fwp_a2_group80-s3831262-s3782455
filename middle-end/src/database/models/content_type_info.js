module.exports = (sequelize, DataTypes) => 
    sequelize.define("content_type_info", { 
        content_type_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        type_name: {
            type: DataTypes.STRING(32),
            allowNull: false
        }
    })