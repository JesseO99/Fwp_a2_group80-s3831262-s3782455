const db = require("../database");


exports.delete = async (req, res) => {
    const count = await db.sub_comment.destroy({where: {user_id: req.query.user_id}});

    console.log(count, " Rows were deleted from the sub_comment table");

    res.json(null);
}

exports.all = async (req,res) => {
    const comment = await db.sub_comment.findAll();

    return comment;
}