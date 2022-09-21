module.exports = (sequelize, DataTypes) => 
    sequelize.define("user", {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        email: {
            type: DataTypes.STRING(32),
            allowNull: false,
            unique: true
        },
        first_name: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(96),
            allowNull: false
        },
        date_joined: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        }
    })

