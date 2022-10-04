const db = require("../database");
const argon2 = require("argon2");


// Select all users from the database.
exports.all = async (req, res) => {
    let follows;
    try {
        follows = await db.follow.findAll();
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