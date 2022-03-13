const sequelize = require('../config/connection');
const { User } = require('../models');

const userSeedData = require('./userSeedData.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  const Users = await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });

process.exit(0);
};

seedAll();
