const sequelize = require('../config/connection');
const { User } = require('../models');

const userSeedsData = require('./userSeedsData.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userSeedsData, {
    individualHooks: true,
    returning: true,
  });

process.exit(0);
};

seedAll();
