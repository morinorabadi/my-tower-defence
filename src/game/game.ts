import { Engine, Scene } from "@babylonjs/core";
import World from "./world/world";
import Player from "./characters/player/Player";
import { Assets } from "./assetsManager/Assets";

export default class Game {
  private static instance: Game;

  private static isDownloadOver = false;
  assets!: Assets;

  private static isLoadOver = false;
  engine: Engine;
  scene: Scene;
  world!: World;
  player!: Player;

  private constructor() {
    const canvas = document.getElementById("game_canvas") as HTMLCanvasElement;
    this.engine = new Engine(canvas, true);
    this.scene = new Scene(this.engine);
  }

  /**
   * first we wait until all assets being downloaded
   */
  private static createInstance() {
    Game.instance = new Game();

    Game.instance.assets = new Assets(() => {
      Game.isDownloadOver = true;
      Game.OnDownloadOver();
    });
  }

  /**
   * then we wait until all classes being created
   */
  private static OnDownloadOver() {
    Game.instance.world = new World();
    Game.instance.player = new Player();

    Game.instance.engine.runRenderLoop(() => {
      Game.instance.scene.render();
    });

    window.addEventListener("resize", () => {
      Game.instance.engine.resize()
    })

    Game.isLoadOver = true;

    // * and loading page should be disappear
  }

  // get game instance
  public static getInstance() {
    if (!Game.instance) {
      Game.createInstance();
    }
    return Game.instance;
  }

  // get game scene
  public static getScene() {
    return Game.getInstance().scene;
  }

  // get game assets
  public static getAssets() {
    return Game.getInstance().assets.assets;
  }
}

Game.getInstance();
