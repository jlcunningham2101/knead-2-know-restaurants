const router = require('express').Router();
const sequelize = require('../config/connection');
const { Restaurant, User, Comment } = require('../models');

// get all comments for homepage
router.get('/', (req, res) => {
  Comment.findAll({
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
    .then(dbHomepageData => {
      const homepage = dbHomepageData.map(homepage => homepage.get({ plain: true }));

      res.render('homepage', {
        homepage,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//login
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

//sign up
router.get('/signup', (req,res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
    }
res.render('signup')
})

module.exports = router;
