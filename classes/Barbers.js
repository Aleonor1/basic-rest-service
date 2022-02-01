'use strict'

class Barbers {
    constructor() {
        this.barbers = [];
        this.id = 1;
    }

    newBarber(firstName, lastName, identityCode, address, phoneNumber) {
        let barber = new Barber(firstName, lastName, identityCode, address, phoneNumber, this.id++);
        this.barbers.push(barber);
        return barber;
    }

    get getAllBarbers() {
        return this.barbers;
    }

    get numberOfBarbers() {
        return this.barbers.length
    }

    deleteBarberById(id) {
        let barberIndex = this.getBarerIndexById(id);
        delete this.barbers[barberIndex];
    }

    updateObjectById(id, updateObject) {
        let barberIndex = this.getBarerIndexById(id);
        for (let key in updateObject) {
            this.barbers[barberIndex][key] = updateObject[key];
        }
    }

    isIdInArray(id) {
        for (let index = 0; index < this.barbers.length; index++) {
            let currentBarber = this.barbers[index];
            if (currentBarber !== undefined && currentBarber !== null)
                if (currentBarber.id == id) {
                    return true;
                }
        }
        return false;
    }

    getBarberById(id) {
        let barberIndex = this.getBarerIndexById(id);
        return this.barbers[barberIndex];
    }

    getBarerIndexById(id) {
        for (let index = 0; index < this.barbers.length; index++) {
            let currentBarber = this.barbers[index];
            if (currentBarber !== undefined && currentBarber !== null)
                if (currentBarber.id == id) {
                    return index;
                }
        }
    }

    replaceBarberById(id, barber) {
        let barberIndex = this.getBarerIndexById(id);
        this.barbers[barberIndex] = barber;
    }

}

module.exports = Barbers;
const Barber = require('./Barber');
