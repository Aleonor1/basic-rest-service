'use strict';

const Client = require('../classes/Client');
const Dog = require('../classes/Dog');
const fs = require('fs');

class ClientHandler {
  constructor() {
    this.clients = new Array();
    this.loadClientsFromJSON();
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
    let newClient = new Client(
      client.firstName,
      client.lastName,
      client.email,
      client.phoneNumber,
      client.id
    );
    this.deleteClientById(client.id);

    console.log(client instanceof Client);
    if (newClient != null && newClient != undefined) {
      newClient.newDog(dogName, dogBreed);
    }
    this.clients.push(newClient);
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
    this.clients = this.clients.filter(client => client);
    this.saveClientsaToJSON();
  }

  replaceClientById(id, client) {
    let clientIndex = this.clients.findIndex(client => client.id == id);
    this.clients[clientIndex] = client;
    this.saveClientsaToJSON();
  }

  loadClientsFromJSON() {
    this.readFilePromise().then(
      message => {
        console.log(message);
      },
      error => {
        console.log(error.message);
      }
    );
  }

  saveClientsaToJSON() {
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

  readFilePromise() {
    let fileString = fs.readFileSync('database/clients.json').toString();
    return new Promise((resolve, reject) => {
      if (!fileString) {
        reject({
          message: 'Client File empty',
        });
      } else {
        let fileObj = JSON.parse(fileString);
        this.clients = fileObj;
        resolve('Clients loaded succesfully');
      }
    });
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
