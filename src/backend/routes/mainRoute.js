const express  = require('express');
const mainController  = require('../controllers/mainController');

const router = express.Router();

router.get('/msg', mainController.hello);

module.exports = router;