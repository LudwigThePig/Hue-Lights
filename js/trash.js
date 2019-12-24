const hue = require('node-hue-api').v3;
const credentials = require('../credentials.js');
const { HueCommands } = require('./commands.js');

const username = credentials.bridgeUser;
const trash = 3;
(async () => {
  try {

    const searchResults = await hue.discovery.nupnpSearch();
    const host = searchResults[0].ipaddress;
    const api = await hue.api.createLocal(host).connect(username);
    const commands = new HueCommands(api);
    // Commands

      
    // The show
    setTimeout(() => commands.turnOn(trash, 20), 0);
    setTimeout(() => commands.intensity(trash, 40), 500);
    setTimeout(() => commands.intensity(trash, 100), 1000);
    setTimeout(() => commands.intensity(trash, 40), 1500);
    setTimeout(() => commands.intensity(trash, 100), 1500);
    setTimeout(() => commands.turnOff(trash), 4000);
    
  } catch (err) { 
    console.error('Yer light is broken', err);
  }
})()