const db = require("../database");
const argon2 = require("argon2");

// Returns a list of all users
exports.all = async (req,res) => {
    const users = await db.user.findAll();

    res.json(users);
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
    

