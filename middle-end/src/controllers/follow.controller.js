const db = require("../database");
const argon2 = require("argon2");


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
            follower_id: req.query.follower_id,
            followed_id: req.query.followed_id
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