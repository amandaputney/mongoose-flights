var express = require('express');
var router = express.Router();

var flightsCtrl = require('../controllers/flights');

router.get('/', flightsCtrl.index);

//AL ROUTES DEFAULT TO /FLIGHTS
router.get('/new', flightsCtrl.new);
//Get route for /flights INDEX ROUTE
router.get('/:id', flightsCtrl.show);

router.post('/', flightsCtrl.create);
module.exports = router;
