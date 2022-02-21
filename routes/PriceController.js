'use strict';

const { response } = require('express');
const express = require('express');
const router = express.Router();
const res = require('express/lib/response');

const PriceHandler = require('../controllers/PriceHandler');
const DogClipperHandler = require('../controllers/DogClipperHandler');
const dogClipperHandler = new DogClipperHandler().getInstance();

let prices = new PriceHandler();

function logger(str) {
  let now = new Date();
  console.log(now.toUTCString() + ' ' + str);
}

router.get('/', (req, res) => {
  logger(`Accesed GET with "/" path`);
  res.send(prices);
});

router.get('/:id', (req, res) => {
  let price = prices.getPriceById(req.params.id);
  if (price != null) {
    logger(`GET Request for price with id ${req.params.id}`);
    res.send(price);
  } else {
    logger(`Price with id ${req.params.id} doesn't exists!`);
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  let data = req.body[0];
  if (!prices.isIdInArray(data.id)) {
    if (dogClipperHandler.isIdInArray(data.dogClipper)) {
      prices.newPrice(
        data.price,
        data.dogBreed,
        dogClipperHandler.getDogClipperById(data.dogClipper),
        data.id
      );
      res.sendStatus(200);
    } else {
      res.status(404);
      res.send(`Clipper with id ${data.dogClipper} doesn't exist`);
    }
  } else {
    res.status(404);
    res.send(`Price with id ${data.id} already exists1`);
  }
});

router.patch('/:id', (req, res) => {
  let updateObject = req.body;
  let id = req.params.id;

  if (prices.isIdInArray(id)) {
    prices.updateObjectById(id, updateObject);
    logger(`Updated price with id ${id} with values ${updateObject}`);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  logger(`Accesed DELETE with "/" path with id ${id}`);
  if (prices.isIdInArray(id)) {
    prices.deletePriceById(id);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

router.put('/:id', (req, res) => {
  let id = req.params.id;
  let data = req.body[0];

  if (prices.isIdInArray(id)) {
    let price = new Price(data.price, data.dogBreed, data.dogClipper);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
