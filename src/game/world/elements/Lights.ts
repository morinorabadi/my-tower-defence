import { HemisphericLight, Vector3 } from "@babylonjs/core";
import Game from "../../game";

export default class Lights {
  defaultLight: HemisphericLight;
  constructor() {
    const scene = Game.getScene();

    // lights is most be deleted
    this.defaultLight = new HemisphericLight(
      "defaultLight",
      Vector3.Up(),
      scene
    );
  }
}
