'use strict';

const Person = require('./Person');

class Barber extends Person {
  constructor(firstName, lastName, identityCode, address, phoneNumber, id) {
    super(firstName, lastName, phoneNumber);
    // this.#firstName = firstName;
    // this.#lastName = lastName;
    this.identityCode = identityCode;
    this.address = address;
    // this.#phoneNumber = phoneNumber;
    this.freeDays = new Array();
    this.id = id;
  }

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }

  getIdentityCode() {
    return this.identityCode;
  }

  getAddress() {
    return this.address;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }

  getId() {
    return this.id;
  }

  setFirstName(firstName) {
    this.firstName = firstName;
  }

  setLastName(lastName) {
    this.lastName = lastName;
  }

  setIdentityCode(identityCode) {
    this.identityCode = identityCode;
  }

  setAddress(address) {
    this.address = address;
  }

  setPhoneNumber(phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  setId(id) {
    this.id = id;
  }

  hasVacation() {
    if (this.freeDays.length === 0) {
      return false;
    }
    return true;
  }
}

module.exports = Barber;
