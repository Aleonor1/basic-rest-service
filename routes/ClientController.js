'use strict';
const { response } = require('express');
const express = require('express');
const res = require('express/lib/response');
const Client = require('../classes/Client');
const ClientsHandler = require('../controllers/ClientHandler');
const router = express.Router();

let clientHandler = new ClientsHandler().getInstance();

function logger(str) {
  let now = new Date();
  console.log(now.toUTCString() + ' ' + str);
}

router.get('/', (req, res) => {
  logger(`Accesed GET with "/" path`);
  res.send(clientHandler);
});

router.get('/:id', (req, res) => {
  let client = Client(clientHandler.getClientById(req.params.id));
  if (client != null) {
    logger(`GET Request for client with id ${req.params.id}`);
    res.send(client);
  } else {
    logger(`Client with identityCode ${req.params.id} doesn't exists!`);
    res.sendStatus(404);
  }
});

router.get('/:id/contact', (req, res) => {
  let client = clientHandler.getClientById(req.params.id);
  if (client != null) {
    logger(`GET Request for client with id ${req.params.id}`);
    let contactData = `Client name: ${client.getLastName()} ${client.getFirstName()} 
    client phone number: ${client.phoneNumber}
    client email: ${client.email}`;
    res.send(contactData);
  } else {
    logger(`Client with identityCode ${req.params.id} doesn't exists!`);
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  let data = req.body[0];
  if (!clientHandler.isIdInArray(data.id)) {
    clientHandler.newClient(
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.id
    );
    logger(`Added client with values:
    firstName: ${data.name}
    lastName: ${data.description}
    id: ${data.id},
    address: ${data.difficulty}`);
    res.sendStatus(200);
  } else {
    logger(`Client with id ${data.id} already exists`);
    res.sendStatus(400);
  }
});

router.post('/:id/addDog', (req, res) => {
  let clientId = req.params.id;
  let data = req.body[0];
  if (clientHandler.isIdInArray(clientId)) {
    clientHandler.addDogToClient(clientId, data.dogName, data.dogBreed);
    res.sendStatus(200);
    logger(`Dog ${data.dogName} added to client with id ${clientId}`);
  } else {
    logger(`Client with id ${clientId} doesn't exists`);
    res.sendStatus(400);
  }
});

router.patch('/:id', (req, res) => {
  let updateObject = req.body;
  let id = req.params.id;
  if (clientHandler.isIdInArray(id)) {
    clientHandler.updateObjectById(id, updateObject);
    logger(`Updated client with id ${id} with values ${updateObject}`);
    res.sendStatus(200);
  } else {
    logger(`Client with identityCode ${id} doesn't exists!`);
    res.sendStatus(404);
  }
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  logger(`Accesed DELETE with "/" path with id ${id}`);

  if (clientHandler.isIdInArray(id)) {
    clientHandler.deleteClientById(id);
    logger(`DELETE Request for client with id ${id}`);
    res.sendStatus(200);
  } else {
    logger(`Client with identityCode ${id} doesn't exists!`);
    res.sendStatus(404);
  }
});

router.put('/:id', (req, res) => {
  let id = req.params.id;
  console.log(req.body);
  let data = req.body;

  if (clientHandler.isIdInArray(id)) {
    let client = new Client(data.firstName, data.lastName, data.email, data.id);
    clientHandler.replaceClientById(id, client);
    logger(`Replaced Client with id ${id} with values ${client}`);
    res.sendStatus(200);
  } else {
    logger(`Client with id ${id} doesn't exists!`);
    res.sendStatus(404);
  }
});

module.exports = router;
