const db = require("../database");



// Deletes all subcomments
exports.delete = async (req, res) => {
    const count = await db.sub_comment.destroy({where: {user_id: req.query.user_id}});

    console.log(count, " Rows were deleted from the sub_comment table");

    res.json(null);
}

// Returns all sub_comments fromt he database
exports.all = async (req, res) => {
    const sub_comments = await db.sub_comments.findAll();

    return sub_comments;
}

