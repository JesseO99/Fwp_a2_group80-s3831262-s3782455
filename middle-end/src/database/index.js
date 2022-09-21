const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
    Op: Sequelize.Op
  };

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT
  });
  

// Include models. (Models = Tables you are instansiating in the DB)
// EG:
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.post = require("./models/post.js")(db.sequelize, DataTypes);
db.comment = require("./models/comment.js")(db.sequelize, DataTypes);
db.sub_comment = require("./models/sub_comment.js")(db.sequelize, DataTypes);
db.follow = require("./models/follow.js")(db.sequelize, DataTypes);
db.user_reaction = require("./models/user_reaction.js")(db.sequelize, DataTypes);
db.reaction_info = require("./models/reaction_info.js")(db.sequelize, DataTypes);
db.content_type_info = require("./models/content_type_info.js")(db.sequelize, DataTypes);

// Relate post and user.
db.post.belongsTo(db.user, { foreignKey: { name: "user_id"} });
db.comment.belongsTo(db.post, {foreignKey: {name: "post_id"}});
db.comment.belongsTo(db.user, { foreignKey: { name: "user_id"} });
db.sub_comment.belongsTo(db.comment, {foreignKey: {name:"comment_id"}});
db.sub_comment.belongsTo(db.user, { foreignKey: { name: "user_id"} });
db.user_reaction.belongsTo(db.reaction_info , {foreignKey: "reaction_type_id"});
db.user_reaction.belongsTo(db.content_type_info, {foreignKey: "content_type_id"});
// Not Sure how to do the conent_id <-> user_reaction relationship as it is a collection of 3 different FK
db.user_reaction.belongsTo(db.user, { foreignKey: { name: "user_id"} });
db.follow.belongsTo(db.user, { foreignKey: { name: "follower_id"} });
db.follow.belongsTo(db.user, { foreignKey: { name: "followed_id"} });




// Learn more about associations here: https://sequelize.org/master/manual/assocs.html


// Include a sync option with seed data logic included.
db.sync = async () => {
    // Sync schema.
    await db.sequelize.sync();
  
    // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
    // await db.sequelize.sync({ force: true });
    
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

    // hash = await argon2.hash("def456", { type: argon2.argon2id });
    // await db.user.create({ username: "shekhar", password_hash: hash, first_name: "Shekhar", last_name : "Kalra" });
}




module.exports = db;
