import Lights from "./elements/Lights";

export default class World {
  lights: Lights;
  constructor() {
    this.lights = new Lights();
  }
}
