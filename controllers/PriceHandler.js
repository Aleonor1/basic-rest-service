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
    savePricesToJSON();
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
    savePricesToJSON();
  }

  getPriceById(id) {
    return this.prices.find(price => price.id === id);
  }

  deletePriceById(id) {
    let priceIndex = this.prices.findIndex(price => price.id == id);
    delete this.prices[priceIndex];
    savePricesToJSON();
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

  async loadPricesFromJSON() {
    let fileString = await fs.readFileSync('database/prices.json').toString();
    let fileObj = await JSON.parse(fileString);
    this.prices = fileObj;
  }
}

module.exports = PriceHandler;
