const db = require("../database");

// Deletes all comments which contain a mataching User_id
exports.delete = async (req, res) => {
    const count = await db.comment.destroy({where: {user_id: req.query.user_id}});

    console.log(count, " Rows were deleted from the sub_comment table");

    res.json(null);
}

// Returns all comments
exports.all = async (req,res) => {
    const comment = await db.comment.findAll();

    return comment;
}