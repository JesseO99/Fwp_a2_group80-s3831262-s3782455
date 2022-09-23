module.exports = (sequelize, DataTypes) => 
    sequelize.define("follow", { 
        follow_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        follower_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        timestamps: false
    })