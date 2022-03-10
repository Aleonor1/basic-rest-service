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
let workingDays = new WorkingDays();
let freeDays = workingDays.getAvailableTimesForAppointments();

function logger(str) {
  let now = new Date();
  console.log(now.toUTCString() + ' ' + str);
}

router.get('/', (req, res) => {
  logger(`Accesed GET with "/" path`);
  res.send({ workingDays: [...workingDays.mapOfDays] });
});

router.post('/', (req, res) => {
  let data = req.body[0];
  logger(`Accesed POST with "/" path`);
  // prettier-ignore
  // if (!data.id || !data.dogClipperId || !data.dog || !data.date || !data.hour || !data.barberId || !data.clientId) {
  //   return res.sendStatus(400);
  // }
  let date = data.date;
  let isFreeDate = freeDays.has(date);
  let isHourIntervalFree = workingDays.isFreeHour(date, data.hour);
  let isBarber = arrayOfBarbers.isIdInArray(data.barberId);
  let isClient = clientHandler.isIdInArray(data.clientId);

  if (isFreeDate && isBarber && isClient && isHourIntervalFree) {
    let barberName =
      arrayOfBarbers.getBarberById(data.barberId)._firstName +
      ' ' +
      arrayOfBarbers.getBarberById(data.barberId)._lastName;

    let clientName =
      clientHandler.getClientById(data.clientId)._firstName +
      ' ' +
      clientHandler.getClientById(data.clientId)._lastName;

    let appointment = new Appointment(
      barberName,
      dogClippers.getDogClipperById(data.dogClipperId).name,
      clientName,
      data.date
    );
    workingDays.addAppointment(appointment, date, data.hour);
    res.sendStatus(200);
  }
  res.sendStatus(400);
});

module.exports = router;
