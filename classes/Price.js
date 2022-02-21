'use strict';

class Price {
  constructor(price, dogBreed, dogClipper, id) {
    this.price = price;
    this.dogBreed = dogBreed;
    this.dogClipper = dogClipper;
    this.id = id;
  }

  get getPrice() {
    return this.price;
  }

  get getDogBreed() {
    return this.dogBreed;
  }

  get getDogClipper() {
    return this.dogClipper;
  }

  get getId() {
    return this.id;
  }

  set setPrice(price) {
    this.price = price;
  }

  set setDogBreed(dogBreed) {
    this.dogBreed = dogBreed;
  }

  set setDogClipper(dogClipper) {
    this.dogClipper = dogClipper;
  }
}

module.exports = Price;
