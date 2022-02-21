'use strict';

const { response } = require('express');
const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

function logger(str) {
  let now = new Date();
  console.log(now.toUTCString() + ' ' + str);
}

const Barber = require('../classes/Barber');
const Barbers = require('../controllers/BarberHandler');

let arrayOfBarbers = new Barbers();

router.get('/', (req, res) => {
  logger(`Accesed GET with "/" path`);
  res.send(arrayOfBarbers);
});

router.get('/new', (req, res) => {
  res.render('barbers/new');
});

router.post('/', (req, res) => {
  let data = req.body[0];
  logger(`Accesed POST with "/" path`);
  if (!arrayOfBarbers.isIdInArray(data.id)) {
    arrayOfBarbers.newBarber(
      data.firstName,
      data.lastName,
      data.identityCode,
      data.address,
      data.phone,
      data.id
    );
    logger(`Added barber with values:
        firstName: ${data.firstName}
        lastName: ${data.lastName}
        identityCode: ${data.id},
        address: ${data.address},
        phone: ${data.phone}`);
    res.sendStatus(200);
  } else {
    logger(`Barber with identityCode ${data.id} already exists!`);
    res.sendStatus(404);
  }
});

router.patch('/:id', (req, res) => {
  let updateObject = req.body;
  let id = req.params.id;
  if (arrayOfBarbers.isIdInArray(id)) {
    arrayOfBarbers.updateObjectById(id, updateObject);
    logger(`Updated barber with id ${id} with values ${updateObject}`);
    res.sendStatus(200);
  } else {
    logger(`Barber with identityCode ${id} doesn't exists!`);
    res.sendStatus(404);
  }
});

router.put('/:id', (req, res) => {
  let id = req.params.id;
  let data = req.body[0];

  if (arrayOfBarbers.isIdInArray(id)) {
    let barber = new Barber(
      data.firstName,
      data.lastName,
      data.id,
      data.address,
      data.phone
    );
    arrayOfBarbers.replaceBarberById(id, barber);
    logger(`Replaced barber with id ${id} with values ${barber}`);
    res.sendStatus(200);
  } else {
    logger(`Barber with identityCode ${id} doesn't exists!`);
    res.sendStatus(404);
  }
});

router.param('id', (req, res, next, id) => {
  req.user = arrayOfBarbers.getBarberById(id);
  next();
});

router.get('/:id', (req, res) => {
  let barber = arrayOfBarbers.getBarberById(req.params.id);
  if (barber != null) {
    logger(`GET Request for barber with id ${req.params.id}`);
    res.send(barber);
  } else {
    logger(`Barber with identityCode ${req.params.id} doesn't exists!`);
    res.sendStatus(404);
  }
});

router.get('/:id/hasVacation', (req, res) => {
  let barber = arrayOfBarbers.getBarberById(req.params.id);
  if (barber != null) {
    logger(`GET Request Barber vacations with id ${req.params.id}`);
    if (barber.hasVacation()) {
      res.send(
        `Barber with id ${req.params.id} has vacation on ${barber.freeDays}`
      );
    } else {
      res.send(`Barber with id ${req.params.id} doesn't have vacation.`);
    }
    // res.send(barber.);
  } else {
    logger(`Barber with identityCode ${req.params.id} doesn't exists!`);
    res.sendStatus(404);
  }
});

router.delete('/:id', (req, res) => {
  logger(`Accesed DELETE with "/" path with id ${req.params.id}`);
  if (arrayOfBarbers.isIdInArray(req.params.id)) {
    arrayOfBarbers.deleteBarberById(req.params.id);
    logger(`DELETE Request for barber with id ${id}`);
    res.sendStatus(200);
  } else {
    logger(`Barber with identityCode ${id} doesn't exists!`);
    res.sendStatus(404);
  }
});

module.exports = router;
