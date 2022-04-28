const { filterByQuery, findById, createNewZookeeper, validateZookeeper} = require('../../lib/zookeepers');
const { zookeepers } = require('../../data/zookeepers.json');
const router = require('express').Router();

// get list of zookeepers from get query
router.get('/zookeepers', (req, res) => {
    let results = zookeepers;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// get specific zookeepers from id as a query parameter
router.get('/zookeepers/:id', (req, res) => {
    const result = findById(req.params.id, zookeepers);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});

// post a new zookeepers to our json data
router.post('/zookeepers', (req, res) => {

    // adds a unique id to the zookeeper object
    req.body.id = zookeepers.length.toString();

    // validates if the zookeeper is correct before add it to our json data
    if (!validateZookeeper(req.body)) {
        res.status(400).send('The zookeeper is not formatted properly');
    } else {
        const zookeeper = createNewZookeeper(req.body, zookeepers);
        res.json(zookeeper);
    }
});

module.exports = router;