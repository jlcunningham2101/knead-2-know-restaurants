const { Comment } = require('../models');

const commentdata = [
  {
    comment_text: 'This restaurant is terrible! Do not eat here. They do not respect COVID protocols.',
    user_id: 6,
    post_id: 1
  },
  
  {
    comment_text: 'Bob is one of a kind and truly a gem. Everything at this restaurant was fresh and made to order',
    user_id: 10,
    post_id: 14
  },
  {
    comment_text: 'I went here with friends over the weekend. The food was okay, but the atmosphere was really warm and welcoming.'
    user_id: 12,
    post_id: 13
  },
  
  {
    comment_text:
      'I ate one of their deli sandwiches and it was great. Has anyone tried their soups??',
    user_id: 5,
    post_id: 4
  },
 

];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
