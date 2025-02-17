const db = require("../database");
const {Sequelize} = require("sequelize");
const argon2 = require("argon2");
const { user } = require("../database");


// Select all users from the database.
exports.all = async (req, res) => {
    let users;
    try {
        users = await db.user.findAll();
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
        "data": users
    });
};


// Select one user from the database.
exports.one = async (req, res) => {
    let user;
    try{
        user = await db.user.findByPk(req.params.id);
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
        "data": user
    });
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
    const user = await db.user.findByPk(req.query.username);

    if(user === null || await argon2.verify(user.password_hash, req.query.password) === false)
        // Login failed.
        res.json(null);
    else
        res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {

    let user;
    try{
        const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

         user = await db.user.create({
            email: req.body.email,
            password: hash,
            first_name: req.body.firstName,
            last_name: req.body.lastName
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
        "data": user
    });

};


exports.findUser = async (req,res) =>{

    let user;
    try{user = await db.user.findAll({
        where: {
            email: req.params.email
        }
    });}catch (err){
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
        "data": user
    });

};

// Returns a user with a matching email
exports.one_email = async (req, res) => {
    const user = await db.user.findAll({
        where:{
            email: req.query.email
    },
    limit: 1
})

    res.json(user[0])
};

// Returns a user foubd by the Primary Key
exports.one_key = async (req, res) => {
    const user = await db.user.findByPk(req.query.user_id);

    res.json(user);

}

// Returns a user if both email and password match
exports.login = async (req, res) => {
    let user = await db.user.findAll({
        where:{
            email: req.query.email
    },
    limit: 1
})
    if(user.length === 0)
    {
        res.json(null);
        return;
    }
    user = user[0];

    if( await argon2.verify(user.password, req.query.password) === false)
    {
        res.json(null);
    }
    else
    {
        res.json(user);
    }
        
};


// Deletes a user with a matching user_id
exports.delete = async (req, res) => {
    console.log("Deleting User by user_id: ", req.query.user_id);
    const user = await db.user.findAll({where: {user_id: req.query.user_id}} );
    const count = await db.user.destroy({where: {user_id: req.query.user_id},force: true});

    console.log(count, " Rows were deleted from the USER table");

    res.json(null);
}

// Updates the current User
exports.update = async (req, res) => {
    const params_to_update = {
        first_name: req.body.params.first_name,
        last_name: req.body.params.last_name,
        email: req.body.params.email
    }
    let response
    try{
        
        response = {
            "status": "100",
            "message": "Success",
            "data": await db.user.update(params_to_update, {where: {user_id: req.body.params.user_id}})
            }

    }catch(err){
        response = {
            "status": "200",
            "message": "Error - Invalid Data "+err,
            "data": null
        }

    }

    res.json(response)
}

exports.all_following = async (req,res) => {
    const user_id = req.query.user_id;
    console.log("Allfollowing")
    let response;
    try {
        response = await db.sequelize.query('SELECT first_name, last_name, email, user_id, date_joined, case WHEN EXISTS(SELECT * FROM follows WHERE follower_id = '+ user_id + ' and followed_id = u1.user_id) THEN true ELSE false END as following from users as u1 where u1.user_id != ' + user_id, { type: Sequelize.QueryTypes.SELECT })
    }
    catch (err)
    {
        console.log("ERROR" + err);
        return;
    }
    
    // console.log(response);
    res.json(response);
} 