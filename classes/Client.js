"use strict";

const Dog = require("./Dog");

class Client {
  constructor(firstName, lastName, email, phoneNumber, id) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.id = id;
    this.dogs = new Array();
  }

  get getFirstName() {
    return this.firstName;
  }

  get getLastName() {
    return this.lastName;
  }

  get getPhoneNumber() {
    return this.phoneNumber;
  }

  get getId() {
    return this.id;
  }

  get getEmail() {
    return this.email;
  }

  set setEmail(email) {
    this.email = email;
  }

  set setFirstName(firstName) {
    this.firstName = firstName;
  }

  set setLastName(lastName) {
    this.lastName = lastName;
  }

  set setPhoneNumber(phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  set setId(id) {
    this.id = id;
  }

  newDog(name, dogBreed) {
    let dog = new Dog(name, dogBreed);
    this.dogs.push(dog);
  }
}

module.exports = Client;
