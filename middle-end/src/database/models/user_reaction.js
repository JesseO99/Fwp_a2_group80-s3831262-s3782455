module.exports = (sequelize, DataTypes) => 
    sequelize.define("user_reaction", { 
        user_reaction_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        reaction_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        content_type_id: {
            type: DataTypes.INTEGER,
            allowNullL: false
        }
    })