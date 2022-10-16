const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");
const argon2 = require("argon2");
const Console = require("console");
const {COMMENT, POST, SUB_COMMENT} = require("../Constant");

const db = {
    Op: Sequelize.Op
  };

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT
  });
  
// Include models. (Models = Tables you are instansiating in the DB)
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.post = require("./models/post.js")(db.sequelize, DataTypes);
db.comment = require("./models/comment.js")(db.sequelize, DataTypes);
db.sub_comment = require("./models/sub_comment.js")(db.sequelize, DataTypes);
db.follow = require("./models/follow.js")(db.sequelize, DataTypes);
db.user_reaction = require("./models/user_reaction.js")(db.sequelize, DataTypes);

// Relate post and user.
db.post.belongsTo(db.user, { foreignKey: { name: "user_id"} });
db.comment.belongsTo(db.post, {foreignKey: {name: "post_id"},onDelete:'CASCADE'});
db.post.hasMany(db.comment,{foreignKey: {name: "post_id"}, onDelete:'CASCADE'});
db.comment.belongsTo(db.user, { foreignKey: { name: "user_id"} });
db.sub_comment.belongsTo(db.comment, {foreignKey: {name:"comment_id"},onDelete:'CASCADE'});
db.comment.hasMany(db.sub_comment,{foreignKey: {name: "comment_id"}, onDelete:'CASCADE'});
db.sub_comment.belongsTo(db.user, { foreignKey: { name: "user_id"} });
db.user_reaction.belongsTo(db.user, { foreignKey: { name: "user_id"} , onDelete: 'CASCADE', onUpdate: 'CASCADE'});
db.follow.belongsTo(db.user, { foreignKey: { name: "follower_id"}, onDelete: 'CASCADE', onUpdate: 'CASCADE' });
db.follow.belongsTo(db.user, { foreignKey: { name: "followed_id"}, onDelete: 'CASCADE', onUpdate: 'CASCADE' });

//Polymorphic Associations
db.post.hasMany(db.user_reaction, {
    foreignKey: 'content_id',
    constraints: false,
    scope: {
        content_type: 'p' //post
    }, onDelete: 'CASCADE', onUpdate: 'CASCADE'
});
db.comment.hasMany(db.user_reaction, {
    foreignKey: 'content_id',
    constraints: false,
    scope: {
        content_type: 'c' //comment
    }, onDelete: 'CASCADE', onUpdate: 'CASCADE'
});
db.sub_comment.hasMany(db.user_reaction, {
    foreignKey: 'content_id',
    constraints: false,
    scope: {
        content_type: 'sc' //sub comment
    }, onDelete: 'CASCADE', onUpdate: 'CASCADE'
});
db.user_reaction.belongsTo(db.post, { foreignKey: 'content_id', constraints: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' });
db.user_reaction.belongsTo(db.comment, { foreignKey: 'content_id', constraints: false , onDelete: 'CASCADE', onUpdate: 'CASCADE'});
db.user_reaction.belongsTo(db.sub_comment, { foreignKey: 'content_id', constraints: false , onDelete: 'CASCADE', onUpdate: 'CASCADE'});


// Include a sync option with seed data logic included.
db.sync = async () => {
    // Sync schema.
    // await db.sequelize.sync();
  
    // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
    await db.sequelize.sync({ force: true });
    
    await seedData();
  };

async function seedData() {
    const count = await db.user.count();

    // Only seed data if necessary.
    if(count > 0)
        return;

    // INSERT SEED DATA HERE
    //eg:
    const argon2 = require("argon2");

    let hash = await argon2.hash("abc123", { type: argon2.argon2id });
    await db.user.create({ email: "rue@gmail.com", password: hash, first_name: "Rue", last_name : "Minmi" });

    let hash2 = await argon2.hash("abc123", { type: argon2.argon2id });
    await db.user.create({ email: "kat.kemi@gmail.com", password: hash, first_name: "Kemila", last_name : "Illankoon" });

    let hash3 = await argon2.hash("abc123", { type: argon2.argon2id });
    await db.user.create({ email: "darren@gmail.com", password: hash, first_name: "Darren", last_name : "Eashay" });

    //Example of Post and Reaction (Polymorphic Association - manually)

    const post = await db.post.create({ user_id: 1, post_content:"Welcome to Loop Agile Now!" });
    const post1 = await db.post.create({ user_id: 1, post_content:"Hello" });
    const post2 = await db.post.create({ user_id: 2, post_content:"Goodbye" });

    const comment = await db.comment.create({
        user_id:1,
        post_id:1,
        comment_content:"You can comment like this :)"

    });
    const subcomment = await db.sub_comment.create({
        user_id:1,
        comment_id:1,
        sub_comment_content:"And you can reply and react like this!!"

    });

    const reaction1 = await db.user_reaction.create({
        user_id:1,
        reaction_type:1, // 1 = Like, 2 = Dislike
        content_id:1,
        content_type:COMMENT // p= post, c = comment, sc = sub comment

    });

    const reaction2 = await db.user_reaction.create({
        user_id:1,
        reaction_type:2, // 1 = Like, 2 = Dislike
        content_id:1,
        content_type:SUB_COMMENT // p= post, c = comment, sc = sub comment

    });

    const reaction3 = await db.user_reaction.create({
        user_id:1,
        reaction_type:1, // 1 = Like, 2 = Dislike
        content_id:1,
        content_type:POST // p= post, c = comment, sc = sub comment

    });

    const follows = await db.follow.create({
        follower_id: 1,
        followed_id: 2
    });

    const follows2 = await db.follow.create({
        follower_id: 2,
        followed_id: 1
    });

}


module.exports = db;
