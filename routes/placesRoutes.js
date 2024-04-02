const express = require('express');
const router = express.Router();
const placesController = require('../controllers/placesController');

// Route to get all places
router.get('/places', placesController.getAllPlaces);
router.get('/myPlaces/:id', placesController.getMyPlaces);


// Route to create a new place
router.post('/places', placesController.createPlace);

// Route to edit a place
router.put('/places/:id', placesController.editPlace);

// Route to delete a place
router.delete('/places/:id', placesController.deletePlace);

module.exports = router;
