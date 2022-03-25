'use strict';

const Barber = require('../classes/Barber');
const fs = require('fs');

class Barbers {
    constructor() {
        this.barbers = [];
        this.loadBarbersFromJSON();
    }

    newBarber(firstName, lastName, identityCode, address, phoneNumber, id) {
        let barber = new Barber(
            firstName,
            lastName,
            identityCode,
            address,
            phoneNumber,
            id
        );

        this.barbers.push(barber);
        this.saveBarbersToJSON();
        return barber;
    }

    get getAllBarbers() {
        return this.barbers;
    }

    get numberOfBarbers() {
        return this.barbers.length;
    }

    deleteBarberById(id) {
        let barberIndex = this.getBarerIndexById(id);
        delete this.barbers[barberIndex];
        this.barbers = this.barbers.filter(barber => barber);
        this.saveBarbersToJSON();
    }

    updateObjectById(id, updateObject) {
        let barberIndex = this.getBarerIndexById(id);
        for (let key in updateObject) {
            this.barbers[barberIndex];
            this.barbers[barberIndex][key] = updateObject[key];
        }
        this.saveBarbersToJSON();
    }

    isIdInArray(id) {
        return this.barbers.some(barber => barber.id == id);
    }

    isBarberNameInArray(firstName, lastName) {
        return this.barbers.some(
            barber =>
                barber.getFirstName() == firstName &&
                barber.getLastName() == lastName
        );
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
        this.saveBarbersToJSON();
    }

    async saveBarbersToJSON() {
        fs.writeFile(
            'database/barbers.json',
            JSON.stringify(this.barbers),
            'utf8',
            function (err) {
                if (err) {
                    console.log(
                        'An error occured while writing JSON Object to File.'
                    );
                    return console.log(err);
                }

                console.log('JSON file has been saved.');
            }
        );
    }

    loadBarbersFromJSON() {
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
        let fileString = fs.readFileSync('database/barbers.json').toString();
        return new Promise((resolve, reject) => {
            if (!fileString) {
                reject({
                    message: 'Barber File empty'
                });
            } else {
                let fileObj = JSON.parse(fileString);
                this.barbers = fileObj;
                resolve('Barbers loaded succesfully');
            }
        });
    }
}

class Singleton {
    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new Barbers();
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}

module.exports = Singleton;
