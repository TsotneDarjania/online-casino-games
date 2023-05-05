export class Indicators extends Phaser.GameObjects.Container {
  spinButton!: Phaser.GameObjects.Image;

  screenWidth!: number;
  screenHeight!: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.scene.add.existing(this);
    this.init();
  }

  init() {
    this.screenWidth = this.scene.game.canvas.width;
    this.screenHeight = this.scene.game.canvas.height;

    this.addBackground();
    this.addSpinButton();
  }

  addBackground() {
    const background = this.scene.add
      .image(0, this.screenHeight - 100, "white")
      .setDisplaySize(this.screenWidth, 100)
      .setOrigin(0)
      .setTint(0x271c4d);

    this.add(background);
  }

  addSpinButton() {
    this.spinButton = this.scene.add
      .image(this.screenWidth / 2, this.screenHeight - 50, "spinButton")
      .setScale(1.2)
      .setInteractive({ cursor: "pointer" });

    this.add(this.spinButton);
  }
}
