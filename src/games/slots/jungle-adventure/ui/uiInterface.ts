import { OptionsModal } from "../components/optionsModal";
import { Main } from "../scenes/main";

export class UiInterface extends Phaser.GameObjects.Container {
  spinButton!: Phaser.GameObjects.Image;
  increaseButton!: Phaser.GameObjects.Image;
  decreaseButton!: Phaser.GameObjects.Image;
  optionsButton!: Phaser.GameObjects.Image;

  optionsModal!: OptionsModal;

  screenWidth!: number;
  screenHeight!: number;

  constructor(public scene: Main, x: number, y: number) {
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

    this.addOptionsButton();
    this.createOptionsModal();
  }

  createOptionsModal() {
    this.optionsModal = new OptionsModal(this.scene, 0, 0);
    this.optionsModal.setVisible(false);
  }

  addOptionsButton() {
    this.optionsButton = this.scene.add
      .image(2, 2, "options-icon")
      .setOrigin(0)
      .setScale(1.1)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.optionsModal.setVisible(true);
        this.optionsButton.setVisible(false);

        this.desableInterface();
      });
  }

  addBetText() {
    this.scene.add
      .text(130, this.screenHeight - 64, "0.10", {
        align: "center",
        fontFamily: "mainfont",
        color: "white",
        fontSize: "30px",
        fixedWidth: 120,
        fixedHeight: 30,
      })
      .setVisible(false);
  }

  addIncreaaseButton() {
    this.increaseButton = this.scene.add
      .image(100, this.screenHeight - 50, "arrowButton")
      .setScale(0.6)
      .setFlip(true, false)
      .setVisible(false)
      .setInteractive({ cursor: "pointer" });
  }

  addDecreaseButton() {
    this.decreaseButton = this.scene.add
      .image(280, this.screenHeight - 50, "arrowButton")
      .setScale(0.6)
      .setVisible(false)
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
