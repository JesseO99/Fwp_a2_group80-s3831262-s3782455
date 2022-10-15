const db = require("../database");
const argon2 = require("argon2");
const {Sequelize} = require("sequelize");

// Select all follows from the database where the user_id is following
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

// Selects all users from the database that the given user is following
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

// Selects all follows from the database
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

// Creates a follows entry
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

// Deletes a follows entry
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

// Checks is provided user_id is following provided profile id returns a boolean value
exports.check_following = async (req, res) => {
    let following;
    try {
        following = await db.follow.findAll({where: {follower_id: req.query.user_id, followed_id: req.query.profile_id }});
    } catch (err)
    {
        console.log(err);
        res.json( false);
        return;
    }

    if(following.length === 0 )
    {
        res.json(false);
    }
    else
    {
        res.json(true);
    }
}