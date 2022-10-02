const db = require("../database");
const e = require("express");
const {SUB_COMMENT, COMMENT, POST} = require("../Constant");


// Select all posts from the database.
exports.all = async (req, res) => {
    let posts;
    try{
        posts = await db.post.findAll({
            include:[{
                model:db.user,
                attributes:['user_id','email','first_name','last_name'],
            },{
                model:db.comment,
                include:[{
                    model:db.sub_comment,
                    include:{
                        model:db.user,
                        attributes:['email','first_name','last_name'],
                    }
                },{
                    model:db.user,
                    attributes:['email','first_name','last_name'],
                }]
            }
            ]});
    }
    catch (err){
        //Api request validation
        res.json({
            "status": "200",
            "message": "Error - Invalid Data "+err,
            "data": null
        });
        return;
    }


    // Can use eager loading to join tables if needed, for example:
    // const posts = await db.post.findAll({ include: db.user });

    // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html

    const response ={
        "status": "100",
        "message": "Success",
        "data": posts
    }

    res.json(response);
};

// Create a post in the database.
exports.create = async (req, res) => {
    let post;
    try {
         post = await db.post.create({
            post_content: req.body.post,
            user_id: req.body.userId,
            image_url: req.body.img
        });
    }
    catch(err) {
        console.log(err);
        //Api request validation
        res.json({
            "status": "200",
            "message": "Error - Invalid Data "+err,
            "data": null
    });
        return;
    }

     const response ={
        "status": "100",
         "message": "Success",
        "data": post
    }


    res.json(response);
};


// Add a Comment in the database.
exports.comment = async (req, res) => {
    let comment;
    try {
        comment = await db.comment.create({
            post_id: req.body.postId,
            user_id: req.body.userId,
            comment_content: req.body.comment
        });
    }
    catch(err) {
        console.log(err);
        //Api request validation
        res.json({
            "status": "200",
            "message": "Error - Invalid Data "+err,
            "data": null
        });
        return;
    }
    const response ={
        "status": "100",
        "message": "Success",
        "data": comment
    }


    res.json(response);
};

// Add a Sub Comment in the database.
exports.subComment = async (req, res) => {
    let sub_comment;
    try {
        sub_comment = await db.sub_comment.create({
            comment_id: req.body.commentId,
            user_id: req.body.userId,
            sub_comment_content: req.body.subComment
        });
    }
    catch(err) {
        console.log(err);
        //Api request validation
        res.json({
            "status": "200",
            "message": "Error - Invalid Data "+err,
            "data": null
        });
        return;
    }
    const response ={
        "status": "100",
        "message": "Success",
        "data": sub_comment
    }


    res.json(response);
};


// Delete a post in the database by Id.
exports.delete = async (req, res) => {
    let deleteStatus;
    try{

       // Find all comments related to the post
       let commentList = await db.comment.findAll({
            where: {
                post_id: req.query.id
            }
        });

        // Find all sub comments related to the post
       let subCommentList =[];

       for(let i =0;i<commentList.length;i++) {
           subCommentList = subCommentList.concat(await db.sub_comment.findAll({
               where: {
                   comment_id: commentList[i].comment_id
               }
           }))
       }


        // Delete all reactions related to the sub comments
        for(let i =0;i<subCommentList.length;i++) {
            deleteStatus = await  db.user_reaction.destroy({
                where:{
                    content_id:subCommentList[i].sub_comment_id,
                    content_type:SUB_COMMENT
                }
            })
        }
        // Delete all reactions related to the comments
        for(let i =0;i<commentList.length;i++) {
            deleteStatus = await db.user_reaction.destroy({
                where:{
                    content_id:commentList[i].comment_id,
                    content_type:COMMENT
                }
            })
        }
        // Delete all reactions related to the post
         db.user_reaction.destroy({
                where:{
                    content_id:req.query.id,
                    content_type:POST
                }
            })

        //Finally delete the post and all corresponding comments,sub comments. They will be automatically deleted since Cascaded
        deleteStatus = await db.post.destroy({
            where: {
                post_id: req.query.id
            }
        });



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
        "data": deleteStatus
    });
};
