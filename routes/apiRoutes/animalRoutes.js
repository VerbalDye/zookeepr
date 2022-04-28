const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals.json');
const router = require('express').Router();

// get list of animals from get query strings
router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// get specific animal from id as a query parameter
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});

// post a new animal to our json data
router.post('/animals', (req, res) => {

    // adds a unique id to the animal object
    req.body.id = animals.length.toString();

    // validates if the animal is correct before adding it to our json data
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not formatted properly.');
    } else {
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

module.exports = router;