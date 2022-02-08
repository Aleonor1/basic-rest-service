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

    get getFirstName() {
        return this.firstName;
    }

    get getLastName() {
        return this.lastName;
    }

    get getIdentityCode() {
        return this.identityCode;
    }

    get getAddress() {
        return this.address;
    }

    get getPhoneNumber() {
        return this.phoneNumber;
    }

    get getId() {
        return this.id;
    }

    set setFirstName(firstName) {
        this.firstName = firstName;
    }

    set setLastName(lastName) {
        this.lastName = lastName;
    }

    set setIdentityCode(identityCode) {
        this.identityCode = identityCode;
    }

    set setAddress(address) {
        this.address = address;
    }

    set setPhoneNumber(phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    set setId(id) {
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