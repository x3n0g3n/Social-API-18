const router = require('express').Router(),
      userRoutes = require('./userRoutes'),
      thoughtRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes);

router.use('/thoughts', thoughtRoutes);

module.exports = router;
