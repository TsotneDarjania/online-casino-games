import { OptionsModal } from "../components/optionsModal";
import { gameConfig } from "../config/gameConfig";
import { screenSize } from "../config/layutConfig";
import { Main } from "../scenes/main";

export class UiInterface extends Phaser.GameObjects.Container {
  background!: Phaser.GameObjects.Image;
  spinButton!: Phaser.GameObjects.Image;
  increaseButton!: Phaser.GameObjects.Image;
  decreaseButton!: Phaser.GameObjects.Image;
  optionsButton!: Phaser.GameObjects.Image;
  betText!: Phaser.GameObjects.Text;

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
    this.addIncreaseButton();
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
      .setDisplaySize(
        screenSize().interface.optionsButton.width,
        screenSize().interface.optionsButton.heiht
      )
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.optionsModal.setVisible(true);
        this.optionsButton.setVisible(false);

        this.desableInterface();
      });
  }

  addBetText() {
    this.betText = this.scene.add
      .text(
        0,
        0,
        `${this.scene.gameManager.bet} ${gameConfig.currencySymbol}`,
        {
          align: "center",
          fontFamily: "mainfont",
          color: "white",
          fontSize: screenSize().interface.betText.fontSize,
          fixedWidth: 120,
          fixedHeight: 30,
        }
      )
      .setOrigin(0.5);

    this.betText.setPosition(
      screenSize().interface.betText.x,
      this.increaseButton.y
    );
  }

  addDecreaseButton() {
    this.decreaseButton = this.scene.add
      .image(
        screenSize().interface.decreaseButton.x,
        this.screenHeight - this.background.displayHeight / 2,
        "arrowButton"
      )
      .setScale(screenSize().interface.decreaseButton.scale)
      .setFlip(true, false)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.scene.gameManager.decreaseBet();
      });
  }

  addIncreaseButton() {
    this.increaseButton = this.scene.add
      .image(
        screenSize().interface.increaseButton.x,
        this.screenHeight - this.background.displayHeight / 2,
        "arrowButton"
      )
      .setScale(screenSize().interface.increaseButton.scale)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.scene.gameManager.increaseBet();
      });
  }

  addBackground() {
    this.background = this.scene.add
      .image(0, 0, "white")
      .setDisplaySize(
        this.screenWidth,
        screenSize().interface.background.height
      )
      .setOrigin(0)
      .setAlpha(0.9)
      .setTint(0x3d291b);

    this.background.setPosition(
      0,
      this.screenHeight - this.background.displayHeight
    );

    this.add(this.background);
  }

  addSpinButton() {
    this.spinButton = this.scene.add
      .image(this.screenWidth / 2, 0, "spinButton")
      .setScale(screenSize().interface.spinButton.scale)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.scene.gameManager.spin();
      })
      .setOrigin(0.5, 0.47);

    this.spinButton.setPosition(
      this.screenWidth / 2,
      this.screenHeight - this.background.displayHeight / 2
    );

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
