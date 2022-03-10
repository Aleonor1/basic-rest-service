'use strict';

const DogClipper = require('../classes/DogClipper');
const fs = require('fs');

class DogClipperHandler {
  constructor() {
    this.dogClippers = new Array();
    this.loadDogClippersFromJSON();
  }

  newDogClipper(name, description, difficulty, id) {
    let dogClipper = new DogClipper(name, description, difficulty, id);
    this.dogClippers.push(dogClipper);
    this.saveClientsaToJSON();
    return dogClipper;
  }

  isIdInArray(id) {
    return this.dogClippers.some(dogClipper => dogClipper.id == id);
  }

  isNameInArray(name) {
    return this.dogClippers.some(dogClipper => dogClipper.name == name);
  }

  getDogClipperById(id) {
    return this.dogClippers.find(dogClipper => dogClipper.id == id);
  }

  updateObjectById(id, updateObject) {
    let dogClipperIndex = this.dogClippers.findIndex(
      dogClipper => dogClipper.id === id
    );
    for (let key in updateObject) {
      this.dogClippers[dogClipperIndex][key] = updateObject[key];
    }
    this.saveClientsaToJSON();
  }

  deleteDogClipperById(id) {
    let dogClipperIndex = this.dogClippers.findIndex(
      dogClipper => dogClipper.id === id
    );
    delete this.dogClippers[dogClipperIndex];
    this.dogClippers = this.dogClippers.filter(dclipper => dclipper);
    this.saveClientsaToJSON();
  }

  replaceDogClipperById(id, dogClipper) {
    let dogClipperIndex = this.dogClippers.findIndex(
      dogClipper => dogClipper.id == id
    );
    this.dogClippers[dogClipperIndex] = dogClipper;
    this.saveClientsaToJSON();
  }

  loadDogClippersFromJSON() {
    this.readFilePromise().then(
      message => {
        console.log(message);
      },
      error => {
        console.log(error.message);
      }
    );
  }

  async saveClientsaToJSON() {
    fs.writeFile(
      'database/dogClippers.json',
      JSON.stringify(this.dogClippers),
      'utf8',
      function (err) {
        if (err) {
          console.log('An error occured while writing JSON Object to File.');
          return console.log(err);
        }

        console.log('JSON file has been saved.');
      }
    );
  }

  readFilePromise() {
    let fileString = fs.readFileSync('database/dogClippers.json').toString();
    return new Promise((resolve, reject) => {
      if (!fileString) {
        reject({
          message: 'Dog Clipper File empty',
        });
      } else {
        let fileObj = JSON.parse(fileString);
        this.dogClippers = fileObj;
        resolve('Dog Clippers loaded succesfully');
      }
    });
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
