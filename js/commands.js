const hue = require('node-hue-api').v3;
const { LightState } = hue.lightStates;


class HueCommands {
  constructor(api) {
    this.api = api;
  }
  
  turnOn = async (light = trash, intensity = 100) => {
    const state = new LightState()
    .on()
    .brightness(intensity);
    
    const result = await this.api.lights.setLightState(light, state);
    console.log(result ? `Light turned on at intensity ${intensity}` : "Error: Failed to turn light on") 
  }
  
  turnOff = async (light = trash) => {
    const state = new LightState()
    .off();
    
    const result = await this.api.lights.setLightState(light, state);
    console.log(result ? 'Light Turned Off' : 'Error: Failed to Turn Light Off');
  }
  
  intensity = async (light = trash, intensity = 100) => {
    const state = new LightState()
    .brightness(intensity);
    
    const result = await this.api.lights.setLightState(light, state);
    console.log(result ? `Intensity set to ${intensity}` : 'Error: Failed to change intensity');
  }
}

module.exports = {
  HueCommands,
};