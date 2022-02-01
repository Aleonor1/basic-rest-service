'use strict'
class Barber {
    constructor(firstName, lastName, identityCode, address, phoneNumber, id) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.identityCode = identityCode;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.freeDays = new Array();
        this.id = id;
    }

    hasVacation() {
        if (this.freeDays.length === 0) {
            return false;
        }
        return true;
    }
}


module.exports = Barber;