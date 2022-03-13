const sequelize = require('../config/connection');
const { Post } = require('../models');

const postSeedsData = require('./postSeedData.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  const posts = await Post.bulkCreate(postSeedsData, {
    individualHooks: true,
    returning: true,
  });


  process.exit(0);
};

seedAll();




