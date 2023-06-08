import { CreateSphere, FreeCamera, Vector3 } from "@babylonjs/core";
import BaseCharacter from "../BaseCharacter";
import Game from "../../game";

export default class Player extends BaseCharacter {
  camera: FreeCamera;
  constructor() {
    super("player");
    const scene = Game.getScene();

    // create fake mesh will be deleted later on
    this.mesh = CreateSphere("playerMesh", { diameter: 2 }, scene);
    this.mesh.parent = this;

    // create camera we don't need to update camera position
    this.camera = new FreeCamera(
      "playerCamera",
      new Vector3(0, 10, -10),
      scene
    );
    this.camera.setTarget(Vector3.Zero());
    this.camera.parent = this;
  }
}
