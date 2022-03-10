class Person {
  constructor(firstName, lastName, phoneNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
  }

  get firstName() {
    return this._firstName;
  }

  get lastName() {
    return this._lastName;
  }

  get phoneNumber() {
    return this._phoneNumber;
  }

  set firstName(value) {
    this._firstName = value;
  }

  set lastName(lastName) {
    this._lastName = lastName;
  }

  set phoneNumber(phoneNumber) {
    this._phoneNumber = phoneNumber;
  }
}

module.exports = Person;
