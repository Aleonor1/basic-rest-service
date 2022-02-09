"use strict";

const DogClipper = require("../classes/DogClipper");

class DogClipperHandler {
  constructor() {
    this.dogClippers = new Array();
  }

  newDogClipper(name, description, difficulty, id) {
    let dogClipper = new DogClipper(name, description, difficulty, id);
    this.dogClippers.push(dogClipper);
    return dogClipper;
  }

  isIdInArray(id) {
    return this.dogClippers.some((dogClipper) => dogClipper.id == id);
  }

  isNameInArray(name) {
    return this.dogClippers.some((dogClipper) => dogClipper.name == name);
  }

  getDogClipperById(id) {
    return this.dogClippers.find((dogClipper) => dogClipper.id == id);
  }

  updateObjectById(id, updateObject) {
    let dogClipperIndex = this.dogClippers.findIndex(
      (dogClipper) => dogClipper.id === id
    );
    for (let key in updateObject) {
      this.dogClippers[dogClipperIndex][key] = updateObject[key];
    }
  }

  deleteDogClipperById(id) {
    let dogClipperIndex = this.dogClippers.findIndex(
      (dogClipper) => dogClipper.id === id
    );
    delete this.dogClippers[dogClipperIndex];
  }

  replaceDogClipperById(id, dogClipper) {
    let dogClipperIndex = this.dogClippers.findIndex(
      (dogClipper) => dogClipper.id === id
    );
    this.dogClippers[dogClipperIndex] = dogClipper;
  }
}

class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new DogClipperHandler();
    }
  }

  getInstance() {
    return Singleton.instance;
  }
}

module.exports = Singleton;
