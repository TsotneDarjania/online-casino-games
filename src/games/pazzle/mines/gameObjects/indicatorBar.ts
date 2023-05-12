import { screenSize } from "../config/layoutConfig";
import { Main } from "../scenes/main";

export class IndicatorBar extends Phaser.GameObjects.Container {
  background!: Phaser.GameObjects.Image;
  fill!: Phaser.GameObjects.Image;

  mainScene!: Main;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.scene.add.existing(this);

    this.init();
  }

  init() {
    this.mainScene = this.scene as Main;
    this.addBackground();
    this.addFill();
  }

  addBackground() {
    this.background = this.scene.add
      .image(
        this.mainScene.screenWidth / 2,
        screenSize().indicatorBar.background.y,
        "white"
      )
      .setOrigin(0.5)
      .setDisplaySize(
        this.mainScene.board.getBounds().width,
        screenSize().indicatorBar.background.height
      )
      .setTint(0x010617);
  }

  addFill() {
    this.fill = this.scene.add
      .image(
        this.mainScene.screenWidth / 2 - this.background.displayWidth / 2,
        screenSize().fill.y,
        "white"
      )
      .setOrigin(0, 0.5)
      .setDisplaySize(0, screenSize().fill.height)
      .setTint(0x15dc65);
  }
}
