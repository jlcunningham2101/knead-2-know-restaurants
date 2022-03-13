const sequelize = require('../config/connection');
const { Restaurant } = require('../models');

const restaurantSeedData = require('./restaurantSeedData.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  const restaurants = await Restaurant.bulkCreate(restaurantSeedData, {
    individualHooks: true,
    returning: true,
  });

process.exit(0);
};

seedAll();




