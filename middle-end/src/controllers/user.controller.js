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
    user = user[0];

    if(user === null || await argon2.verify(user.password, req.query.password) === false)
    {
        res.json(null);
        console.log("LOGIN Failed");
    }
    else
    {
        res.json(user);
    }
        
};
    

