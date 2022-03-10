'use strict';

const fs = require('fs');
const Price = require('../classes/Price');

class PriceHandler {
  constructor() {
    this.prices = new Array();
    this.loadPricesFromJSON();
  }

  newPrice(price, dogBreed, dogClipper, id) {
    let priceToAdd = new Price(price, dogBreed, dogClipper, id);
    this.prices.push(priceToAdd);
    this.savePricesToJSON();
  }

  isIdInArray(id) {
    return this.prices.some(price => price.id == id);
  }

  updateObjectById(id, updateObject) {
    let priceIndex = this.prices.findIndex(price => price.id == id);
    console.log(this.prices[priceIndex]);
    for (let key in updateObject) {
      this.prices[priceIndex][key] = updateObject[key];
    }
    this.savePricesToJSON();
  }

  getPriceById(id) {
    return this.prices.find(price => price.id == id);
  }

  deletePriceById(id) {
    let priceIndex = this.prices.findIndex(price => price.id == id);
    delete this.prices[priceIndex];
    this.savePricesToJSON();
  }

  replacePriceById(id, price) {
    let priceIndex = this.getPriceById(id);
    this.prices[priceIndex] = price;
    this.saveBarbersToJSON();
  }

  async savePricesToJSON() {
    fs.writeFile(
      'prices.json',
      JSON.stringify(this.prices),
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

  loadPricesFromJSON() {
    this.readFilePromise().then(
      message => {
        console.log(message);
      },
      error => {
        console.log(error.message);
      }
    );
  }

  readFilePromise() {
    let fileString = fs.readFileSync('database/prices.json').toString();
    return new Promise((resolve, reject) => {
      if (!fileString) {
        reject({
          message: 'Price File empty',
        });
      } else {
        let fileObj = JSON.parse(fileString);
        this.dogClippers = fileObj;
        resolve('Prices loaded succesfully');
      }
    });
  }
}

module.exports = PriceHandler;
