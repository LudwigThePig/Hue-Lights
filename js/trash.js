const hue = require('node-hue-api').v3;
const credentials = require('../credentials');
const { HueCommands } = require('./commands');
const rgbToHsl = require('./rgbConverter');

const username = credentials.bridgeUser;
const trash = 4;
(async () => {
  try {

    const searchResults = await hue.discovery.nupnpSearch();
    const host = searchResults[0].ipaddress;
    const api = await hue.api.createLocal(host).connect(username);
    const commands = new HueCommands(api);
    // Commands

      
    // The show
    setTimeout(() => commands.turnOn(trash, 100), 0);
    setTimeout(() => commands.color(trash, ...rgbToHsl(255, 0, 0)), 1000);
    setTimeout(() => commands.color(trash, ...rgbToHsl(0, 255, 0)), 2000);
    setTimeout(() => commands.color(trash, ...rgbToHsl(0, 0, 255)), 3000);
    setTimeout(() => commands.turnOff(trash), 4000);
    
  } catch (err) { 
    console.error('Yer light is broken', err);
  }
})()