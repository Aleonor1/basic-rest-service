'use strict'

class Dog {
    constructor(name, dogBreed) {
        this.name = name;
        this.dogBreed = dogBreed;
    }

    getName() {
        return this.name;
    }

    getDogBreed() {
        return this.dogBreed;
    }
}