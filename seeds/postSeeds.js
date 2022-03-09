const { Post } = require('../models');

const postdata = [
  {
    title: 'Do not come here!',
    post_url: 'https://buzzfeed.com/in/imperdiet/et/commodo/vulputate.png',
    user_id: 10
  },
  {
    title: 'Best place on earth!',
    post_url: 'https://nasa.gov/donec.json',
    user_id: 8
  },
  {
    title: 'Amazing Staff',
    post_url: 'https://europa.eu/parturient/montes/nascetur/ridiculus/mus/etiam/vel.aspx',
    user_id: 1
  },
  {
    title: 'Creative food offerings',
    post_url: 'http://desdev.cn/enim/blandit/mi.jpg',
    user_id: 4
  },
  {
    title: 'Help!',
    post_url: 'http://google.ca/nam/nulla/integer.aspx',
    user_id: 7
  },
  
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
