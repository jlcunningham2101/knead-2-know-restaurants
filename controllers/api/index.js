const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
/*const postRoutes = require('./postRoutes.js');*/
const commentRoutes = require('./commentRoutes');
const restaurantRoutes = require('./restaurantRoutes');


router.use('/users', userRoutes);
/*router.use('/posts', postRoutes);*/
router.use('/comments', commentRoutes);
router.use('/restaurants', restaurantRoutes);


module.exports = router;
