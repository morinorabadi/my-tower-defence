import "@babylonjs/loaders";
import {
  AbstractAssetTask,
  AssetsManager,
  MeshAssetTask,
} from "@babylonjs/core";
import Game from "../game";

const IModels = ["ground"] as const;
type IModelsNames = (typeof IModels)[number];

type IAssets = {
  models: Record<IModelsNames, MeshAssetTask>;
};

export class Assets extends AssetsManager {
  assets!: IAssets;

  constructor(onDownloadOver: () => void) {
    super(Game.getScene());
    this.useDefaultLoadingScreen = false;

    this.onFinish = (tasks) => {
      onDownloadOver();
      this.handleFinish(tasks);
    };

    this.onProgress = this.handleProgress.bind(this);

    // * add models tasks
    IModels.forEach((name) =>
      this.addMeshTask(name, "", "/3d/", name + ".glb")
    );

    this.load();
  }

  private handleFinish(tasks: AbstractAssetTask[]) {
    this.assets = { models: {} } as IAssets;
    tasks.forEach((task) => {
      // * MODELS
      if (task instanceof MeshAssetTask) {
        const { loadedMeshes, name } = task;
        if (!loadedMeshes[0]) return;

        // * rename root mesh
        loadedMeshes[0].name = `__${name}__`;
        loadedMeshes[0].id = `__${name}__`;

        // * save loaded models
        this.assets.models[name as IModelsNames] = task;

        loadedMeshes[0].setEnabled(false);
      }
    });
  }
  private handleProgress(remainingCount: number, totalCount: number) {
    const progress = Math.ceil(
      ((totalCount - remainingCount) / totalCount) * 100
    );
    console.log("progress:  ", progress);
  }
}
