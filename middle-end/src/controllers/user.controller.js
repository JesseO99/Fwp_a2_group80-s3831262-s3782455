const db = require("../database");
const argon2 = require("argon2");

exports.all = async (req,res) => {
    const users = await db.user.findAll();

    res.json(users);
};

exports.one_email = async (req, res) => {
    const user = await db.user.findAll({
        where:{
            email: req.query.email
    },
    limit: 1
})

    res.json(user[0])
};

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
    

