export class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.setPath(`../../assets/games/mines/`);

    this.load.image("background-star", "images/background-star.png");
    this.load.image("symbol-background", "images/symbol-background.png");
    this.load.image("bomb", "images/bomb.png");
    this.load.image("minus", "images/minus.png");
    this.load.image("plus", "images/plus.png");
    this.load.image("bet-option-button", "images/database.png");
    this.load.image("bet-button", "images/bet-button.png");

    this.load.image("white", "images/white.png");
  }

  create() {
    this.scene.start("Main");
  }
}
