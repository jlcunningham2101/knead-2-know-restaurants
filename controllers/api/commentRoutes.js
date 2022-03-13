const router = require('express').Router();
const { Comment } = require('../../models');
const Restaurant = require('../../models/restaurant');
const withAuth = require('../../utils/auth');

//get all comments
router.get('/', (req, res) => {
  Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//See a restaurant comment
router.get('/:id', withAuth, (req, res) => {
  Comment.findAll({
      where: {
          restaurant_id: req.params.id
      },
        attributes: [
           'id',
           'comment_text',
           'user_id',
           'post_id'
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
          }
        ]
      })
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
      console.log(err);
      res.status(400).json(err);
  });
});

//Create a restaurant comment
router.post('/', withAuth, (req, res) => {
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.body.user_id,
    post_id: req.body.post_id
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

//update a comment
router.put('/:id', withAuth, (req, res) => {
  Comment.update({
    comment_text: req.body.comment_text,
    user_id: req.body.user_id,
    post_id: req.body.post_id
  },
  {
    where: {
        id: req.params.id
    }
})
.then(dbCommentData => {
    if(!dbCommentData) {
        res.status(404).json({ message: 'No comment found!'});
        return;
    }        
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

//delete a user comment
router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
