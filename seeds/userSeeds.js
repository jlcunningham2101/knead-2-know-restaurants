const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
  {
    username: 'jlcunningham1',
    email: 'jlcunningham@gmail.com',
    password: 'password124'
  },
  {
    username: 'alaramee1',
    email: 'alaramee@gmail.com',
    password: 'password125'
  },
  {
    username: 'smustafa1',
    email: 'smustafa@gmail.com',
    password: 'password126'
  },
  {
    username: 'rshealh2',
    email: 'rshealth@yahoo.com',
    password: 'password127'
  },
  {
    username: 'rdubbz3',
    email: 'bdubbz@hotmail.com',
    password: 'password128'
  },
  
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
