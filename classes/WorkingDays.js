'use strict';

const Appointment = require('./Appointment');

class WorkingDays {
  constructor() {
    this.mapOfDays = new Map();
  }

  getDaysInMonth(month, year) {
    let date = new Date(year, month, 2);
    let days = [];
    while (date.getMonth() === month) {
      days.push(
        date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
      );
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  getFreeDaysOfCurrentMonth() {
    this.getDaysInMonth(2, 2022).forEach(day => {
      this.mapOfDays.set(day, new Appointment('', '', '', day));
    });
  }

  getDaysWithoutAppointments() {
    this.getFreeDaysOfCurrentMonth();
    let daysWithoutAppointments = new Map();
    for (let key of this.mapOfDays.keys()) {
      let currentIterationDay = this.mapOfDays.get(key);
      if (currentIterationDay.isAppointmentFree()) {
        daysWithoutAppointments.set(key, this.mapOfDays.get(key));
      }
    }
    return daysWithoutAppointments;
  }

  addAppointment(appointment, data) {
    console.log(this.mapOfDays.keys());
    console.log(this.mapOfDays.get(data));
    this.mapOfDays.set(data, appointment);
  }
}

module.exports = WorkingDays;
