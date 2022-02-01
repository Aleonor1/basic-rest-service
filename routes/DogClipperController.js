'use strict'


const { response } = require('express');
const express = require('express');
const res = require('express/lib/response');
const DogClipper = require('../classes/DogClipper');
const DogClipperController = require('../controllers/DogClipperHandler');
const router = express.Router();

let dogClippers = new DogClipperController();

// const logger = console.log;
function logger(str) {
    let now = new Date();
    console.log(now.toUTCString() + " " + str);
}


router.get("/", (req, res) => {
    logger(`Accesed GET with "/" path`);
    res.send(dogClippers);
})

router.post('/', (req, res) => {
    let data = req.body[0];
    if (!dogClippers.isIdInArray(data.id)) {
        dogClippers.newDogClipper(data.name, data.description, data.difficulty, data.id);
        logger(`Added dog clipper with values:
        firstName: ${data.name}
        lastName: ${data.description}
        id: ${data.id},
        address: ${data.difficulty}`);
        res.sendStatus(200);
    } else {
        logger(`Dog Clipper with identityCode ${data.id} already exists!`);
        res.sendStatus(404);
    }
})

router.patch('/:id', (req, res) => {
    let updateObject = req.body;
    let id = req.params.id;
    if (dogClippers.isIdInArray(id)) {
        dogClippers.updateObjectById(id, updateObject);
        logger(`Updated dogClippers with id ${id} with values ${updateObject}`);
        res.sendStatus(200);
    } else {
        logger(`dogClippers with identityCode ${id} doesn't exists!`);
        res.sendStatus(404);
    }
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    logger(`Accesed DELETE with "/" path with id ${id}`);
    if (dogClippers.isIdInArray(id)) {
        dogClippers.deleteDogClipperById(id);
        logger(`DELETE Request for dog clipper with id ${id}`);
        res.sendStatus(200);
    } else {
        logger(`Dog clipper with identityCode ${id} doesn't exists!`);
        res.sendStatus(404);
    }
})

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let data = req.body[0];

    if (dogClippers.isIdInArray(id)) {
        let dogClipper = new DogClipper(data.name, data.description, data.difficultyLevel, data.id);
        dogClippers.replaceDogClipperById(id, dogClipper)
        logger(`Replaced dogClipper with id ${id} with values ${dogClipper}`);
        res.sendStatus(200);
    } else {
        logger(`Barber with identityCode ${id} doesn't exists!`);
        res.sendStatus(404);

    }
})




module.exports = router;
