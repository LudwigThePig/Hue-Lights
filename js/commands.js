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

  hue = async (light = trash, color = 65535) => {
    const state = new LightState()
      .hue(color);
    
    const result = await this.api.lights.setLightState(light, state);
    console.log(result ? `Hue set to ${color}` : 'Error: Failed to change intensity');
  }

  CIE = async (light = trash, x = 0, y = 0) => {
    const state = new LightState()
      .xy(x, y);
    
    const result = await this.api.lights.setLightState(light, state);
    console.log(result ? `Hue set to x-${x}, y-${y} ` : 'Error: Failed to change intensity');
  }

  color = async (light, hue, saturation, luminance) => {
    const state = new LightState()
      .hsl(hue, saturation, luminance);
    
    const result = await this.api.lights.setLightState(light, state);
    console.log(result ? `Hue set to hue-${hue}, saturation-${saturation} luminance-${luminance} ` : 'Error: Failed to change intensity');

  }
}

module.exports = {
  HueCommands,
};