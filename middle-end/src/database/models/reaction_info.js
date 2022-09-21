module.exports = (sequelize, DataTypes) => 
    sequelize.define("reaction_info", { 
        reaction_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        reaction_name: {
            type: DataTypes.STRING(32),
            allowNull: false
        }
    })