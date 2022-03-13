const sequelize = require('../config/connection');
const { Comment } = require('../models');

const commentSeedsData = require('./commentSeedsData.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  const comments = await Comment.bulkCreate(commentSeedsData, {
    individualHooks: true,
    returning: true,
  });


  process.exit(0);
};

seedAll();




