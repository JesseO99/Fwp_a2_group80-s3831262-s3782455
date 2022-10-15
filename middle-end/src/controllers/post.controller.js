const db = require("../database");
const e = require("express");
const {SUB_COMMENT, COMMENT, POST} = require("../Constant");


// Select all posts and relate data from the database.
exports.all = async (req, res) => {
    let user_id = req.query.id
    let posts;
    try {
        posts = await db.post.findAll({
            include: [{
                model: db.user,
                attributes: ['user_id', 'email', 'first_name', 'last_name'],
            }, {
                model: db.comment,
                include: [{
                    model: db.sub_comment,
                    include: [{
                        model: db.user,
                        attributes: ['email', 'first_name', 'last_name'],
                    },{
                        model: db.user_reaction,
                        attributes:[[
                            db.sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM user_reactions AS reaction
                    WHERE
                    reaction.content_id = sub_comment_id
                        AND
                        reaction.content_type = "sc"
                        AND
                        reaction.reaction_type = "1"
                )`),
                            'likedCount'
                        ],[
                            db.sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM user_reactions AS reaction
                    WHERE
                    reaction.content_id = sub_comment_id
                        AND
                        reaction.content_type = "sc"
                        AND
                        reaction.reaction_type = "2"
                )`),
                            'dislikedCount'
                        ],[
                            db.sequelize.literal(`(
                    SELECT reaction_type FROM user_reactions AS reaction
                    WHERE reaction.user_id = ${user_id}
                    AND reaction.content_type ='sc'
                    AND reaction.content_id = sub_comment_id
                )`),
                            'userReaction'
                        ]],

                    }]
                },{
                    model: db.user_reaction,
                    attributes:[[
                        db.sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM user_reactions AS reaction
                    WHERE
                    reaction.content_id = comments.comment_id
                        AND
                        reaction.content_type = "c"
                        AND
                        reaction.reaction_type = "1"
                )`),
                        'likedCount'
                    ],[
                        db.sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM user_reactions AS reaction
                    WHERE
                    reaction.content_id = comments.comment_id
                        AND
                        reaction.content_type = "c"
                        AND
                        reaction.reaction_type = "2"
                )`),
                        'dislikedCount'
                    ],[
                        db.sequelize.literal(`(
                    SELECT reaction_type FROM user_reactions AS reaction
                    WHERE reaction.user_id = ${user_id}
                    AND reaction.content_type ='c'
                    AND reaction.content_id = comments.comment_id
                )`),
                        'userReaction'
                    ]]
                }, {
                    model: db.user,
                    attributes: ['email', 'first_name', 'last_name'],
                }]
            },{
                model: db.user_reaction,
                attributes:[[
                    db.sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM user_reactions AS reaction
                    WHERE
                    reaction.content_id = post.post_id
                        AND
                        reaction.content_type = "p"
                        AND
                        reaction.reaction_type = "1"
                )`),
                    'likedCount'
                ],[
                    db.sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM user_reactions AS reaction
                    WHERE
                    reaction.content_id = post.post_id
                        AND
                        reaction.content_type = "p"
                        AND
                        reaction.reaction_type = "2"
                )`),
                    'dislikedCount'
                ],[
                    db.sequelize.literal(`(
                    SELECT reaction_type FROM user_reactions AS reaction 
                    WHERE reaction.user_id = ${user_id}
                    AND reaction.content_type ='p'
                    AND reaction.content_id = post.post_id
                )`),
                    'userReaction'
                ]]
            }
            ]
        });
    } catch (err) {
        //Api request validation
        res.json({
            "status": "200",
            "message": "Error - Invalid Data " + err,
            "data": null
        });
        return;
    }

    // Can use eager loading to join tables if needed, for example:
    // const posts = await db.post.findAll({ include: db.user });

    // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html

    const response = {
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
    } catch (err) {
        console.log(err);
        //Api request validation
        res.json({
            "status": "200",
            "message": "Error - Invalid Data " + err,
            "data": null
        });
        return;
    }

    const response = {
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
    } catch (err) {
        console.log(err);
        //Api request validation
        res.json({
            "status": "200",
            "message": "Error - Invalid Data " + err,
            "data": null
        });
        return;
    }
    const response = {
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
    } catch (err) {
        console.log(err);
        //Api request validation
        res.json({
            "status": "200",
            "message": "Error - Invalid Data " + err,
            "data": null
        });
        return;
    }
    const response = {
        "status": "100",
        "message": "Success",
        "data": sub_comment
    }


    res.json(response);
};


// Insert or update a Reaction in the database.
exports.reaction = async (req, res) => {
    let reaction, oldReaction;
    try {
        oldReaction = await db.user_reaction.findOne({
            where: {
                user_id: req.body.userId,
                content_id: req.body.contentId,
                content_type: req.body.contentType
            }
        });
        if (!oldReaction) {
            // Reaction not found, create a new one
            reaction = await db.user_reaction.create({
                content_id: req.body.contentId,
                content_type: req.body.contentType,
                reaction_type: req.body.reactionType,
                user_id: req.body.userId

            });
        }else{
            // Reaction found, update the old one
            reaction = await db.user_reaction.update({
                content_id: req.body.contentId,
                content_type: req.body.contentType,
                reaction_type: req.body.reactionType,
                user_id: req.body.userId

            },{where:{
                    user_reaction_id:oldReaction.user_reaction_id
                }});
        }

    } catch (err) {
        console.log(err);
        //Api request validation
        res.json({
            "status": "200",
            "message": "Error - Invalid Data " + err,
            "data": null
        });
        return;
    }
    const response = {
        "status": "100",
        "message": "Success",
        "data": reaction
    }


    res.json(response);
};


// Delete a post in the database by Id.
exports.delete = async (req, res) => {
    let deleteStatus;
    try {

        // Find all comments related to the post
        let commentList = await db.comment.findAll({
            where: {
                post_id: req.query.id
            }
        });

        // Find all sub comments related to the post
        let subCommentList = [];

        for (let i = 0; i < commentList.length; i++) {
            subCommentList = subCommentList.concat(await db.sub_comment.findAll({
                where: {
                    comment_id: commentList[i].comment_id
                }
            }))
        }


        // Delete all reactions related to the sub comments
        for (let i = 0; i < subCommentList.length; i++) {
            deleteStatus = await db.user_reaction.destroy({
                where: {
                    content_id: subCommentList[i].sub_comment_id,
                    content_type: SUB_COMMENT
                }
            })
        }
        // Delete all reactions related to the comments
        for (let i = 0; i < commentList.length; i++) {
            deleteStatus = await db.user_reaction.destroy({
                where: {
                    content_id: commentList[i].comment_id,
                    content_type: COMMENT
                }
            })
        }
        // Delete all reactions related to the post
        db.user_reaction.destroy({
            where: {
                content_id: req.query.id,
                content_type: POST
            }
        })

        //Finally delete the post and all corresponding comments,sub comments. They will be automatically deleted since Cascaded
        deleteStatus = await db.post.destroy({
            where: {
                post_id: req.query.id
            }
        });


    } catch (err) {
        //Api request validation
        res.json({
            "status": "200",
            "message": "Error - Invalid Data " + err,
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


// Select all posts from the database with a matching user_id
exports.user_posts = async (req, res) => {
    let posts;
    console.log("user_Posts", req.params.user_id);
    try{
        posts = await db.post.findAll({ where: {user_id: req.params.user_id}, 
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