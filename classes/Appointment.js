'use strict';

class Appointment {
  constructor(barber, dogClipper, client, date, dog) {
    this.barber = barber;
    this.dogClipper = dogClipper;
    this.client = client;
    this.date = date;
    this.dog = dog;
  }

  isAppointmentFree() {
    return this.barber === '';
  }
}

module.exports = Appointment;
