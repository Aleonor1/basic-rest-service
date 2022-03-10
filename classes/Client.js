'use strict';

const Dog = require('./Dog');

class Client {
  constructor(firstName, lastName, email, phoneNumber, id, dogs = new Array()) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.id = id;
    this.dogs = dogs;
  }

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email) {
    this.email = email;
  }

  setFirstName(firstName) {
    this.firstName = firstName;
  }

  setLastName(lastName) {
    this.lastName = lastName;
  }

  setPhoneNumber(phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  setId(id) {
    this.id = id;
  }

  newDog(name, dogBreed) {
    let dog = new Dog(name, dogBreed);
    this.dogs.push(dog);
  }

  getDogBreedByName(dogName) {
    return this.dogs.find(dog => dog.getName() == dogName).getDogBreed();
  }
}

module.exports = Client;
