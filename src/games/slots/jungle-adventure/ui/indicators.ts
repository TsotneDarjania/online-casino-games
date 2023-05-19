import { Main } from "../scenes/main";

export class Indicators extends Phaser.GameObjects.Container {
  spinButton!: Phaser.GameObjects.Image;
  increaseButton!: Phaser.GameObjects.Image;
  decreaseButton!: Phaser.GameObjects.Image;

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
    this.addIncreaaseButton();
    this.addDecreaseButton();

    this.addBetText();
  }

  addBetText() {
    this.scene.add.text(130, this.screenHeight - 64, "0.10", {
      align: "center",
      fontFamily: "mainfont",
      color: "white",
      fontSize: "30px",
      fixedWidth: 120,
      fixedHeight: 30,
    });
  }

  addIncreaaseButton() {
    this.increaseButton = this.scene.add
      .image(100, this.screenHeight - 50, "arrowButton")
      .setScale(0.6)
      .setFlip(true, false)
      .setInteractive({ cursor: "pointer" });
  }

  addDecreaseButton() {
    this.decreaseButton = this.scene.add
      .image(280, this.screenHeight - 50, "arrowButton")
      .setScale(0.6)
      .setInteractive({ cursor: "pointer" });
  }

  addBackground() {
    const background = this.scene.add
      .image(0, this.screenHeight - 105, "white")
      .setDisplaySize(this.screenWidth, 105)
      .setOrigin(0)
      .setAlpha(0.7)
      .setTint(0x3d291b);

    this.add(background);
  }

  addSpinButton() {
    this.spinButton = this.scene.add
      .image(this.screenWidth / 2, this.screenHeight - 50, "spinButton")
      .setScale(0.9)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        const scene = this.scene as Main;
        scene.board.spinAllColumns();

        this.desableInterface();
      });

    this.add(this.spinButton);
  }

  desableInterface() {
    this.spinButton.setTint(0x919399);
    this.spinButton.disableInteractive();

    this.increaseButton.setTint(0x919399);
    this.increaseButton.disableInteractive();

    this.decreaseButton.setTint(0x919399);
    this.decreaseButton.disableInteractive();
  }

  enableInterface() {
    this.spinButton.setTint(0xffffff);
    this.spinButton.setInteractive();

    this.increaseButton.setTint(0xffffff);
    this.increaseButton.setInteractive();

    this.decreaseButton.setTint(0xffffff);
    this.decreaseButton.setInteractive();
  }
}
