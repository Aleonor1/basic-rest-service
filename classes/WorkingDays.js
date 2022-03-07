'use strict';

const Appointment = require('./Appointment');

class WorkingDays {
  constructor() {
    this.mapOfDays = new Map();
    this.addHoursToDay();
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

  getWorkingDaysOfCurrentMonth() {
    this.getDaysInMonth(2, 2022).forEach(day => {
      this.mapOfDays.set(day, this.addHoursToDay());
    });
  }

  getAvailableTimesForAppointments() {
    this.getWorkingDaysOfCurrentMonth();
    let daysWithoutAppointments = new Map();
    for (let key of this.mapOfDays.keys()) {
      let currentIterationDay = this.mapOfDays.get(key);
      daysWithoutAppointments.set(key, this.mapOfDays.get(key));
    }
    return daysWithoutAppointments;
  }

  addHoursToDay() {
    let arrayOfHours = new Object();
    for (let hour = 8; hour < 17; hour++) {
      arrayOfHours[hour + ':00'] = new Appointment('', '', '', '', '');
    }

    return arrayOfHours;
  }

  addAppointment(appointment, data, hour) {
    this.mapOfDays.get(data)[hour] = appointment;
    // this.mapOfDays.set(data[hour], appointment);
  }

  isFreeHour(data, hour) {
    console.log(this.mapOfDays.get(data)[hour]);
    let appointment = this.mapOfDays.get(data)[hour];
    return appointment.getBarber() == '';
  }
}

module.exports = WorkingDays;
