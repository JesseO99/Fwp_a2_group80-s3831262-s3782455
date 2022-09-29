const db = require("../database");


exports.delete = async (req, res) => {
    console.log("")
    const user_id =  req.query.user_id;
    const posts = await db.post.findAll({where: {user_id:  user_id},force: true});

    if(posts.length !== 0)
    {
        console.log("LENGHT: ", posts.length);
        for(const post of posts)
        {

            const comments = await db.comment.findAll({where: {post_id: post.post_id},force: true});
            if(comments.length !==0)
            {
                for(const comment of comments)
                {
                    const count = await db.sub_comment.destroy({where: {comment_id: comment.comment_id},force: true});
                    console.log(count, " Rows were deleted from the sub_comment table");
                }
    
                const count  = await db.comment.destroy({where: {post_id: post.post_id},force: true});
                console.log(count, " Rows were deleted from the comment table");   
            }

        }
        const count = await db.post.destroy({where: {user_id: user_id},force: true});

        console.log(count, " Rows were deleted from the post table");
    }
    res.json(null);
}


exports.all = async (req, res) => {
    const posts = await db.post.findAll();

    res.json(posts);
}