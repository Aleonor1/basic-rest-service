'use strict';

class Price {
    constructor(price, dogBreed, dogClipper) {
        this.price = price;
        this.dogBreed = dogBreed;
        this.dogClipper = dogClipper;
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