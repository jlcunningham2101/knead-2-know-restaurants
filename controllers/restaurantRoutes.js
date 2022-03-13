const router = require('express').Router();
const sequelize = require('../config/connection');
const { Comment, User, Restaurant, Post } = require('../models');
const withAuth = require('../utils/auth');

//get all restaurants
router.get('/', (req, res) => {
    Restaurant.findAll({
        attribues: [
            'id',
            'restaurant_name',
            'restaurant_type',
            'phone',
            'website',
            'address',
            'image'
        ]
    })
    .then(dbRestaurantData => {
        const restaurants = dbRestaurantData.map(restaurant => restaurant.get({ plain: true }));

        res.render('restaurant', {
            restaurants,
            loggedIn: req.session.loggedIn
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // get one restaurant comment 
  router.get('/:id', withAuth, (req, res) => {
      Comment.findAll({
          where: {
              restaurant_id: req.params.id
          },
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
                attributes: [            
                'id',
                'restaurant_name',
                'restaurant_type',
                'phone',
                'website',
                'address',
                'image'  
                  ]              
              },
              {
            model: User,
            attributes: [
            'username'
                  ]
            }
        ],   
      })
      .then(dbCommentData => {         
              const comments = dbCommentData.map(comment => comment.get({plain: true }));
              res.render('restaurant-comments', {
                comments,
                loggedIn: req.session.loggedIn
              });                        
      })
      .catch(err => {
          console.log(err)
          res.status(500).json(err);
      })
  });

  //post new comment
  router.get('/comment/:id', withAuth, (req, res) => {
      Restaurant.findByPk(req.params.id, {
          attributes: [
            'id',
            'restaurant_name',
            'restaurant_type',
            'address',
            'phone_number',
            'website',
            'image'  
          ]
      })
      .then(dbRestaurantData => {
          if (dbRestaurantData) {
              const restaurant = dbRestaurantData.get({ plain: true });

              res.render('submit-comment', {
                  restaurant,
                  loggedIn: true
              });
          } else {
              res.status(404).end();
          }
      })
      .catch(err => {
          console.log(err)
          res.status(500).json(err)
      })
  })

  module.exports = router;