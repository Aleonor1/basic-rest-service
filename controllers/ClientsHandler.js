"use strict";

const Client = require("../classes/Client");
const Dog = require("../classes/Dog");

class ClientHandler {
  constructor() {
    this.clients = new Array();
  }

  newClient(firstName, lastName, email, phoneNumber, id) {
    let client = new Client(firstName, lastName, email, phoneNumber, id);
    this.clients.push(client);
  }

  addDogToClient(clientId, dogName, dogBreed) {
    let client = this.clients.find((client) => client.id == id);
    if (client != null && client != undefined) {
      client.newDog(dogName, dogBreed);
    }
  }

  removeDogFromClient(clientId, dogName) {}
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
