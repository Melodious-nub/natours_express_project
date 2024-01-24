const express = require('express');
// controller of handlers
const tourController = require('../controllers/tourController');
// router midelewere
const router = express.Router();

// midllewere for checkid
router.param('id', tourController.checkId);

// create checkbody middlewere
// check if body contains the name and price property
// if not, send back 400(bad request)
// add it to the post handler stack

// routes
router.route('/').get(tourController.getAllTour).post(tourController.checkBody, tourController.postAllTour);
router.route('/:id').get(tourController.getTourById).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = router;