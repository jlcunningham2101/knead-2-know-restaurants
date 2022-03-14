// import all models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Restaurant = require('./Restaurant');
//const Vote = require('./Vote');

// create Post associations
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Post.belongsTo(Restaurant, {
  foreignKey: 'restaurant_id'
});

Post.hasMany(Comment, {
  foriegnKey: 'post_id'
});

/*Post.belongsToMany(User, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

Post.hasMany(Vote, {
  foreignKey: 'post_id'
});
*/

//create user associations
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foriegnKey: 'user_id'
});

User.belongsTo(Post, {
  foreignKey: 'user_id'
});

User.belongsTo(Comment, {
  foreignKey: 'user_id',
});

User.belongsTo(Restaurant, {
  foreign_key: 'user_id',
});

User.belongsToMany(Post, {
  through: User,
  as: 'user_id',
});

User.belongsToMany(Comment, {
  through: User,
  as: 'user_id',
});

//create comment associations
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Restaurant, {
  foreignKey: 'restaurant_id'
});


//create restaurant associations
Restaurant.hasMany(Post, {
  foriegnKey: 'restaurant_id'
});

Restaurant.hasMany(Comment, {
  foriegnKey: 'restaurant_id'
})

Restaurant.belongsTo( Post, {
  foriegnKey: 'restaurant_id'
});

Restaurant.belongsTo(User, {
  foriegnKey: 'restaurant_id'
});

Restaurant.belongsToMany(Comment, {
  foriegnKey: 'restaurant_id'
});

/*Vote.belongsTo(User, {
  //foreignKey: 'user_id',
  //onDelete: 'SET NULL'
});

Vote.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});
*/

module.exports = { Restaurant, User, Post, Comment };
