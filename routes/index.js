const router = require('express').Router(),
      apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => res.send('Incorrect route!'));

module.exports = router;
