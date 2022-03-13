const router = require('express').Router();
const { Restaurant, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

//get all restaurants
router.get('/', (req, res) => {
    Restaurant.findAll()
      .then(dbRestaurantData => res.json(dbRestaurantData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/:id', (req, res) => {
    Restaurant.findByPk(req.params.id, {
      include: [{
          model: Comment,
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
           include: {
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
          }
          }
            ]   
  })
      .then(dbRestaurantData => {
        if(!dbRestaurantData) {
          res.status(404).json({ message: 'No restaurants found!'});
          return;
        }
        res.json(dbRestaurantData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;