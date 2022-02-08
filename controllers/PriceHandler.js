'use strict';


class PriceHandler {
    constructor() {
        this.prices = Array;
    }

    newPrice(price) {
        let price = new Price(price);
        this.prices.push(price);
    }

}

