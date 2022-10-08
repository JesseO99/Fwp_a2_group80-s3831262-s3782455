const db = require("../database");
const argon2 = require("argon2");
const {Sequelize} = require("sequelize");

// Select all users from the database.
exports.following_all = async (req, res) => {
    let follows;
    const user_id = req.query.user_id;

    try {
        follows = await db.follow.findAll({where: {follower_id: user_id}});
    }catch (err){
        //Api request validation
        res.json({
            "status": "200",
            "message": "Error - Invalid Data "+err,
            "data": null
        });
        return;
    }

    res.json({
        "status": "100",
        "message": "Success",
        "data": follows
    });
};

exports.all_users_follow = async (req, res) => {
    let users;

    const user_id = req.query.user_id;

    try {
        users = await db.sequelize.query("SELECT user_id, first_name, last_name, email, 1 as following FROM `follows` join `users` WHERE follower_id = " + user_id + " and user_id = followed_id", { type: Sequelize.QueryTypes.SELECT } );
    } catch (err) {
        res.json({
            "status": "200",
            "message": "Error - Invalid Data "+err,
            "data": null
        });
        return;
    }
    console.log(users)
    res.json({
        "status": "100",
        "message": "Success",
        "data": users
    });
}

exports.all = async (req, res) => {
    let follows;

    try{
        follows = await db.follow.findAll();
    } catch (err) {
        // API Request validation
        res.json({
            "status": "200",
            "message": "Error - Invalid Data " + err,
            "data": null
        })
    }
    res.json({
        "status": "100",
        "message": "Success",
        "data": follows
    });

}

exports.follow = async (req, res) => {
    let follows;

    try{
        follows = await db.follow.create({
            follower_id: req.body.params.follower_id,
            followed_id: req.body.params.followed_id
        });
    } catch (err) {
        // API Request validation
        res.json({
            "status": "200",
            "message": "Error - Invalid Data " + err,
            "data": null
        })
    }
    res.json({
        "status": "100",
        "message": "Success",
        "data": follows
    });
}

exports.unfollow = async (req, res) => {
    let delete_follow;

    try {
        delete_follow = await db.follow.destroy({
            where: { 
                follower_id: req.query.follower_id,
                followed_id: req.query.followed_id
            }
        })
    } catch (err) {
        // API Request validation
        res.json({
            "status": "200",
            "message": "Error - Invalid Data " + err,
            "data": null
        })
    }

    res.json({
        "status": "100",
        "message": "Success",
        "data": delete_follow
    });
}