const router = require('express').Router();
const sequelize = require('../config/connection');
const { Restaurant, User, Comment, Post } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'post_text',
      'atmosphere',
      'staff_experience',
      'speed',
      'rating',
      'user_id',
      'restaurant_id'
    ],
    include: [
      {
        model: Restaurant,
        attributes: ['id', 'restaurant_name', 'restaurant_type', 'phone', 'website', 'address', 'image'],
      },
      {
        model: User,
        attributes: ['username']
      },
      {
      model: Comment,
      attributes: ['id', 'comment_text']
      }
        ]
})
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', {posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

//edit posts
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: [
      'id',
      'comment_text',
      'atmosphere',
      'staff_experience',
      'speed',
      'rating',
      'user_id',
      'restaurant_id'
     ],
    include: [
      {
        model: Restaurant,
        attributes: ['id', 'restaurant_name', 'restaurant_type', 'phone', 'website', 'address', 'image'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
         ]
  })
    .then(dbCommentData => {
      if (dbCommentData) {
        const comment = dbCommentData.get({ plain: true });
        
        res.render('edit-comment', {
          comment,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
