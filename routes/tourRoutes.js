const express = require('express');
// controller of handlers
const tourController = require('../controllers/tourController');
// router midelewere
const router = express.Router();

router.param('id', tourController.checkId);

// routes
router.route('/').get(tourController.getAllTour).post(tourController.postAllTour);
router.route('/:id').get(tourController.getTourById).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = router;