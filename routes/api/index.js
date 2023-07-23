// initialize variables and import required module
const router = require('express').Router(),
      userRoutes = require('./userRoutes'),
      thoughtRoutes = require('./thoughtRoutes');

// set the users api path
router.use('/users', userRoutes);

// set the thoughts api path
router.use('/thoughts', thoughtRoutes);

// export the routes
module.exports = router;
