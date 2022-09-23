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

        // 0 - Like, 1 - Dislike
        reaction_type: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        content_id: {
            type: DataTypes.INTEGER,
            allowNullL: false
        },
        content_type: {
            type: DataTypes.STRING,
            allowNullL: false
        }

    },{
        timestamps: false
    })