export class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.setPath(`../../assets/games/jungle-adventure/`);

    //common
    this.load.image("white", "images/common/white.png");

    //ui
    this.load.image("spinButton", "images/ui/spin.png");
  }

  create() {
    this.scene.start("Main");
  }
}
