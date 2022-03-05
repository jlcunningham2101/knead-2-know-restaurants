const express = require('express');
const router = express.Router();

router.use(require('./restaurantRoutes'));
router.use(require('./menuCommentRoutes'));
router.use(require('./menuRoutes'));
router.use(require('./userRoutes'));
router.use(require('./userTypeRoutes'));

