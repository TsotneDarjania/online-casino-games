import { IndicatorBar } from "../gameObjects/indicatorBar";

export class Interface extends Phaser.GameObjects.Layer {
  bottomIndicators!: Phaser.GameObjects.Container;

  screenWidth!: number;
  screenHeight!: number;

  plusButton!: Phaser.GameObjects.Image;
  minusButton!: Phaser.GameObjects.Image;
  betOptionsButton!: Phaser.GameObjects.Image;
  betButton!: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene) {
    super(scene);

    this.init();
  }

  init() {
    this.screenWidth = this.scene.game.canvas.width;
    this.screenHeight = this.scene.game.canvas.height;

    this.bottomIndicators = this.scene.add.container(0, this.screenHeight - 50);

    //bottom interface
    this.addBetText();
    this.addPlusButton();
    this.addMinusButton();
    this.addBetOptionButton();
    this.addBetButton();

    this.addTotalBalanceText();
    this.addIndicatorBar();
    this.addNextBalance();

    //correct bottom indicator position
    this.bottomIndicators.setPosition(
      this.screenWidth / 2 - this.bottomIndicators.getBounds().width / 2,
      this.screenHeight - 50
    );
  }

  addNextBalance() {
    this.scene.add.text(this.screenWidth - 200, 50, "NEXT 2.44 USD", {
      align: "center",
      color: "#FEF9F0",
      fontSize: 16,
      shadow: {
        offsetX: 1,
        offsetY: 1,
        blur: 5,
        color: "#FEF9F0",
        fill: true,
      },
    });
  }

  addIndicatorBar() {
    new IndicatorBar(this.scene, 0, 0);
  }

  addTotalBalanceText() {
    this.scene.add.text(this.screenWidth - 200, 20, "TOTAl 1000 USD", {
      align: "center",
      color: "#FA7057",
      fontSize: 20,
      shadow: {
        offsetX: 1,
        offsetY: 1,
        blur: 5,
        color: "#FA7057",
        fill: true,
      },
    });
  }

  addBetButton() {
    this.betButton = this.scene.add
      .image(241, 9, "bet-button")
      .setOrigin(0)
      .setScale(0.7)
      .setInteractive({ cursor: "pointer" });
    this.bottomIndicators.add(this.betButton);
  }

  addBetOptionButton() {
    this.betOptionsButton = this.scene.add
      .image(190, 5, "bet-option-button")
      .setScale(0.35)
      .setOrigin(0)
      .setInteractive({ cursor: "pointer" });
    this.bottomIndicators.add(this.betOptionsButton);
  }

  addPlusButton() {
    this.plusButton = this.scene.add
      .image(140, -2, "plus")
      .setScale(0.5)
      .setOrigin(0)
      .setInteractive({ cursor: "pointer" });
    this.bottomIndicators.add(this.plusButton);
  }

  addMinusButton() {
    this.minusButton = this.scene.add
      .image(0, -2, "minus")
      .setScale(0.5)
      .setOrigin(0)
      .setInteractive({ cursor: "pointer" });
    this.bottomIndicators.add(this.minusButton);
  }

  addBetText() {
    const betText = this.scene.add
      .text(92, 22, "0 USD", {
        align: "center",
        color: "white",
        fontSize: 20,
        shadow: {
          offsetX: 1,
          offsetY: 1,
          blur: 5,
          color: "#ffffff",
          fill: true,
        },
      })
      .setOrigin(0.5);

    this.bottomIndicators.add(betText);
  }
}
