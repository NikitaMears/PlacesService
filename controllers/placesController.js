const Places = require('../models/Places');

// Controller function to get all places
async function getAllPlaces(req, res) {
  try {
    const places = await Places.findAll();
    res.json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Controller function to create a new place
async function createPlace(req, res) {
  const { userId, coordinates, properties } = req.body;
  const status = 'Pending'
  try {
    const newPlace = await Places.create({ userId, coordinates, properties, status });
    res.status(201).json(newPlace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Controller function to edit a place
async function editPlace(req, res) {
  const { id } = req.params;
  const { userId, coordinates, properties, status } = req.body;
  let statusValue;
  if (status != null || status != ''){
    statusValue = status
  }
  else{
    statusValue = 'Pending'
  }
  try {
    let place = await Places.findByPk(id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    place = {
      ...place.toJSON(),
      userId,
      coordinates,
      properties,
      status: statusValue
    };
    await Places.update(place, { where: { id } });
    res.json(place);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
async function getMyPlaces(req, res) {
    const { id } = req.params;
    try {
        let places = await Places.findAll({ where: { userId: id } });
        if (!places) {
        return res.status(404).json({ message: 'Place not found' });
      }
     
      res.json(places);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

// Controller function to delete a place
async function deletePlace(req, res) {
  const { id } = req.params;
  try {
    const place = await Places.findByPk(id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    await place.destroy();
    res.json({ message: 'Place deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { getAllPlaces, createPlace, editPlace, deletePlace, getMyPlaces };
