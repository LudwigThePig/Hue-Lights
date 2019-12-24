const hue = require('node-hue-api').v3;
const credentials = require('../credentials.js');
const { LightState } = hue.lightStates;

const username = credentials.bridgeUser;
const trash = 3;
(async () => {
  try {

    const searchResults = await hue.discovery.nupnpSearch();
    const host = searchResults[0].ipaddress;
    const api = await hue.api.createLocal(host).connect(username);

    // Commands
    const turnOn = async (light = trash, intensity = 100) => {
      const state = new LightState()
        .on()
        .brightness(intensity);
        
        const result = await api.lights.setLightState(light, state);
        console.log(result ? `Light turned on at intensity ${intensity}` : "Error: Failed to turn light on") 
      }
      
      const turnOff = async (light = trash) => {
        const state = new LightState()
        .off();

        const result = await api.lights.setLightState(light, state);
        console.log(result ? 'Light Turned Off' : 'Error: Failed to Turn Light Off');
      }
      const intensity = async (light = trash, intensity = 100) => {
        const state = new LightState()
        .brightness(intensity);
        
      const result = await api.lights.setLightState(light, state);
      console.log(result ? `Intensity set to ${intensity}` : 'Error: Failed to change intensity');
    }
      
    // The show
    setTimeout(() => turnOn(trash, 20), 0);
    setTimeout(() => intensity(trash, 40), 500);
    setTimeout(() => intensity(trash, 100), 1000);
    setTimeout(() => intensity(trash, 40), 1500);
    setTimeout(() => intensity(trash, 100), 1500);

    setTimeout(() => turnOff(trash), 4000);
    
  } catch (err) { 
    console.error('Yer light is broken', err);
  }
})()