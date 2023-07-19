var express = require('express');
var router = express.Router();

var flightsCtrl = require('../controllers/flights');


//AL ROUTES DEFAULT TO /FLIGHTS
router.get('/new', flightsCtrl.new);

router.post('/', flightsCtrl.create);

//Get route for /flights INDEX ROUTE

router.get('/', flightsCtrl.index);

router.get('/:id', flightsCtrl.show);

module.exports = router;
