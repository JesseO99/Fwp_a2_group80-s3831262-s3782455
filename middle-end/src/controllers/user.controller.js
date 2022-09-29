const db = require("../database");
const argon2 = require("argon2");
const { user } = require("../database");


// Select all users from the database.
exports.all = async (req, res) => {
    const users = await db.user.findAll();

    res.json(users);
};


// Select one user from the database.
exports.one = async (req, res) => {
    const user = await db.user.findByPk(req.params.id);

    res.json(user);
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
    const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

    const user = await db.user.create({
        email: req.body.email,
        password: hash,
        first_name: req.body.firstName,
        last_name: req.body.lastName
    });

    res.json(user);
};


exports.findUser = async (req,res) =>{
    const user = await db.user.findAll({
        where: {
            email: req.params.email
        }
    });

    res.json(user);

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



exports.delete = async (req, res) => {
    console.log("Deleting User by user_id: ", req.query.user_id);
    const user = await db.user.findAll({where: {user_id: req.query.user_id}} );
    const count = await db.user.destroy({where: {user_id: req.query.user_id},force: true});

    console.log(count, " Rows were deleted from the USER table");

    res.json(null);
}

exports.update = async (req, res) => {

    // console.log("user_id: ", req.body.params.user_id, "\nfirst_name: ", req.query.first_name, "\nlast_name: ", req.query.last_name, "\nemail: ", req.query.email);
    // console.log("Request: ", req);
    const updated_user = await db.user.update({
        first_name: req.body.params.first_name,
        last_name: req.body.params.last_name,
        email: req.body.params.email
    }, {where: {user_id: req.body.params.user_id}});

    res.json(updated_user)
    // console.log(res);
}