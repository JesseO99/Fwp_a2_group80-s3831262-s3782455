const db = require("../database");




exports.delete = async (req, res) => {
    const count = await db.sub_comment.destroy({where: {user_id: req.query.user_id}});

    console.log(count, " Rows were deleted from the sub_comment table");

    res.json(null);
}


exports.all = async (req, res) => {
    const sub_comments = await db.sub_comments.findAll();

    return sub_comments;
}

