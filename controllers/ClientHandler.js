'use strict';

const Client = require('../classes/Client');
const Dog = require('../classes/Dog');

class ClientHandler {
  constructor() {
    this.clients = new Array();
  }

  isIdInArray(id) {
    return this.clients.some(client => client.id == id);
  }

  getClientById(id) {
    return this.clients.find(client => client.id == id);
  }

  newClient(firstName, lastName, email, phoneNumber, id) {
    let client = new Client(firstName, lastName, email, phoneNumber, id);
    this.clients.push(client);
  }

  addDogToClient(clientId, dogName, dogBreed) {
    let client = this.clients.find(client => client.id == clientId);
    if (client != null && client != undefined) {
      client.newDog(dogName, dogBreed);
    }
  }

  updateObjectById(id, updateObject) {
    let clientIndex = this.clients.findIndex(client => client.id == id);

    for (let key in updateObject) {
      this.clients[clientIndex][key] = updateObject[key];
    }
  }

  deleteClientById(id) {
    let clientIndex = this.clients.findIndex(client => client.id == id);
    delete this.clients[clientIndex];
  }

  replaceClientById(id, dogClipper) {
    let clientIndex = this.clients.findIndex(client => client.id === id);
    this.clients[clientIndex] = client;
  }
}

class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = new ClientHandler();
    }
  }

  getInstance() {
    return Singleton.instance;
  }
}

module.exports = Singleton;
