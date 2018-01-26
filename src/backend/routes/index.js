const express  = require('express');

const router = express.Router();

router.use('/api/v1/main', require('./mainRoute'));

module.exports = router;