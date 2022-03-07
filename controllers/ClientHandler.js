'use strict';

const Client = require('../classes/Client');
const Dog = require('../classes/Dog');
const fs = require('fs');

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
    this.saveClientsaToJSON();
  }

  addDogToClient(clientId, dogName, dogBreed) {
    let client = this.clients.find(client => client.id == clientId);
    if (client != null && client != undefined) {
      client.newDog(dogName, dogBreed);
    }
    this.saveClientsaToJSON();
  }

  updateObjectById(id, updateObject) {
    let clientIndex = this.clients.findIndex(client => client.id == id);

    for (let key in updateObject) {
      this.clients[clientIndex][key] = updateObject[key];
    }
    this.saveClientsaToJSON();
  }

  deleteClientById(id) {
    let clientIndex = this.clients.findIndex(client => client.id == id);
    delete this.clients[clientIndex];
    this.saveClientsaToJSON();
  }

  replaceClientById(id, dogClipper) {
    let clientIndex = this.clients.findIndex(client => client.id === id);
    this.clients[clientIndex] = client;
    this.saveClientsaToJSON();
  }

  async saveClientsaToJSON() {
    fs.writeFile(
      'database/clients.json',
      JSON.stringify(this.clients),
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

  async loadClientsFromJSON() {
    let fileString = fs.readFileSync('database/clients.json').toString();
    let fileObj = await JSON.parse(fileString);
    this.clients = fileObj;
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
