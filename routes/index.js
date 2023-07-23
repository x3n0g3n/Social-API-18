// initialize variables and import required module
const router = require('express').Router(),
      apiRoutes = require('./api');

// mount the apiRoutes middleware at the '/api' path
router.use('/api', apiRoutes);

// handle any requests that don't match the defined routes
router.use((req, res) => res.send('Incorrect route!'));

// export the routes
module.exports = router;
