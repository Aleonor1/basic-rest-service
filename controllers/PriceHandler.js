'use strict';

const Price = require('../classes/Price');

class PriceHandler {
  constructor() {
    this.prices = new Array();
  }

  newPrice(price, dogBreed, dogClipper, id) {
    let priceToAdd = new Price(price, dogBreed, dogClipper, id);
    this.prices.push(priceToAdd);
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
  }

  getPriceById(id) {
    return this.prices.find(price => price.id === id);
  }

  deletePriceById(id) {
    let priceIndex = this.prices.findIndex(price => price.id == id);
    delete this.prices[priceIndex];
  }
}

module.exports = PriceHandler;
