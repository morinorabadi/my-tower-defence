import { Mesh, TransformNode } from "@babylonjs/core";
import Game from "../game";
export default abstract class BaseCharacter extends TransformNode {
  mesh?: Mesh;
  constructor(name: string) {
    super(name, Game.getScene());
  }
}
