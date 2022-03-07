'use strict';

const { response } = require('express');
const express = require('express');
const res = require('express/lib/response');
const Appointment = require('../classes/Appointment');
const WorkingDays = require('../classes/WorkingDays');
const DogClipperHandler = require('../controllers/DogClipperHandler');
const ClientHandler = require('../controllers/ClientHandler');
const router = express.Router();
let dogClippers = new DogClipperHandler().getInstance();

const Barbers = require('../controllers/BarberHandler');
let arrayOfBarbers = new Barbers().getInstance();
let clientHandler = new ClientHandler().getInstance();

function logger(str) {
  let now = new Date();
  console.log(now.toUTCString() + ' ' + str);
}

router.get('/', (req, res) => {
  logger(`Accesed GET with "/" path`);
  let workingDays = new WorkingDays();
  let freeDays = workingDays.getDaysWithoutAppointments();
  res.send({ freeDays: [...freeDays] });
});

router.post('/', (req, res) => {
  let data = req.body[0];
  logger(`Accesed POST with "/" path`);
  let date = data.date;
  let workingDays = new WorkingDays();
  let freeDays = workingDays.getDaysWithoutAppointments();
  let isFreeDate = freeDays.has(date);
  let isBarber = arrayOfBarbers.isIdInArray(data.barberId);
  let isClient = clientHandler.isIdInArray(data.clientId);

  if (isFreeDate && isBarber && isClient) {
    let appointment = new Appointment(
      arrayOfBarbers.getBarberById(data.barberId),
      dogClippers.getDogClipperById(data.dogClipperId),
      clientHandler.getClientById(data.clientId)
    );
    workingDays.addAppointment(appointment, date);
  }
  res.send({ workingDays: [...workingDays.mapOfDays] });
});

module.exports = router;
