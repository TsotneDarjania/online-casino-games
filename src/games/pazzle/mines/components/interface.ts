import { gameDataConfig } from "../config/gameDataConfig";
import { IndicatorBar } from "../gameObjects/indicatorBar";
import { Main } from "../scenes/main";

export class Interface extends Phaser.GameObjects.Layer {
  bottomIndicators!: Phaser.GameObjects.Container;

  screenWidth!: number;
  screenHeight!: number;

  plusButton!: Phaser.GameObjects.Image;
  minusButton!: Phaser.GameObjects.Image;
  betOptionsButton!: Phaser.GameObjects.Image;
  betOptionsModal!: Phaser.GameObjects.DOMElement;
  betButton!: Phaser.GameObjects.Image;
  cashOutButton!: Phaser.GameObjects.Image;

  betText!: Phaser.GameObjects.Text;
  nextText!: Phaser.GameObjects.Text;
  totalBalanceText!: Phaser.GameObjects.Text;
  cashOutText!: Phaser.GameObjects.Text;

  mineButton!: Phaser.GameObjects.DOMElement;
  minesOptionModal!: Phaser.GameObjects.DOMElement;

  fillIndicatorBar!: IndicatorBar;

  constructor(public scene: Main) {
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
    this.addMineButton();
    this.createMinesOptionModal();
    this.createBetOptionsModal();
    this.createCashOutButton();
    this.createCashOutText();

    //correct bottom indicator positions
    this.bottomIndicators.setPosition(
      this.screenWidth / 2 - this.bottomIndicators.getBounds().width / 2,
      this.screenHeight - 50
    );
  }

  createCashOutText() {
    (this.cashOutText = this.scene.add
      .text(290, -4, "0$", {
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
      })
      .setOrigin(0.5)
      .setVisible(false)),
      this.bottomIndicators.add(this.cashOutText);
  }

  createBetOptionsModal() {
    this.betOptionsModal = this.scene.add
      .dom(
        this.screenWidth / 2,
        this.screenHeight - 190,
        "div",
        "width : " +
          this.bottomIndicators.getBounds().width +
          "px; height : 270px; background-color: #44434D; box-shadow: 0px 4px 4px 4px solid #44434D; display: flex; justify-content: center; align-items: center;"
      )
      .setVisible(false);

    let posX = 12;
    let posY = 12;

    for (let i = 1; i <= 15; i++) {
      const betOptionButton = this.scene.add
        .dom(
          posX,
          posY,
          "button",
          "width : 150px",
          gameDataConfig.bets[i - 1].toString()
        )
        .setOrigin(0)
        .setInteractive();
      betOptionButton.addListener("click");
      betOptionButton.on("click", () => {
        this.scene.gameManager.changeBet(i - 1);
      });
      this.betOptionsModal.node.appendChild(betOptionButton.node);

      posY += 25;
      if (i % 10 === 0) {
        posY = 12;
        posX += 160;
      }
    }
  }

  createMinesOptionModal() {
    this.minesOptionModal = this.scene.add
      .dom(
        this.screenWidth / 2 - 5,
        175,
        "div",
        "width : 144px; height : 230px; background-color: #ABA7A1; overflow-y : scroll;"
      )
      .setVisible(false);

    let posY = 10;

    for (let i = 1; i <= 20; i++) {
      const childButton = this.scene.add
        .dom(
          this.minesOptionModal.width / 2,
          posY,
          "button",
          "width : 100px; height : 20px",
          i.toString()
        )
        .setInteractive();
      childButton.addListener("click");
      childButton.on("click", () => {
        const value = (childButton.node as HTMLInputElement).innerHTML;
        this.minesOptionModal.setVisible(false);
        this.mineButton.setText("Mines : " + value);
        this.scene.gameManager.changMinesNumber(Number(value));
      });
      this.minesOptionModal.node.appendChild(childButton.node);
      posY += 25;
    }
  }

  addMineButton() {
    this.mineButton = this.scene.add
      .dom(
        this.screenWidth / 2,
        40,
        "button",
        "padding : 4px 40px;  cursor : pointer;font-size : 13px; font-weight : bold; color : #F2EDE4; background-color : #403E3C; border : 2px solid #63615D",
        `Mines : ${gameDataConfig.mines}`
      )
      .setInteractive();
    this.mineButton.addListener("click");
  }

  addNextBalance() {
    this.nextText = this.scene.add.text(
      this.screenWidth - 230,
      50,
      "NEXT 0 USD",
      {
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
      }
    );
  }

  addIndicatorBar() {
    this.fillIndicatorBar = new IndicatorBar(this.scene, 0, 0);
  }

  addTotalBalanceText() {
    this.totalBalanceText = this.scene.add.text(
      this.screenWidth - 230,
      20,
      `TOTAL ${gameDataConfig.user.totalBalance.toFixed(2)} ${
        gameDataConfig.user.currency
      }`,
      {
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
      }
    );
  }

  addBetButton() {
    this.betButton = this.scene.add
      .image(241, 9, "bet-button")
      .setOrigin(0)
      .setScale(0.7)
      .setInteractive({ cursor: "pointer" });
    this.bottomIndicators.add(this.betButton);
  }

  createCashOutButton() {
    this.cashOutButton = this.scene.add
      .image(241, 9, "cash-out-image")
      .setOrigin(0)
      .setScale(0.7)
      .setVisible(false)
      .setInteractive({ cursor: "pointer" });

    this.bottomIndicators.add(this.cashOutButton);
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
    this.betText = this.scene.add
      .text(
        92,
        22,
        `${gameDataConfig.bets[gameDataConfig.user.betIndex].toString()}$`,
        {
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
        }
      )
      .setOrigin(0.5);

    this.bottomIndicators.add(this.betText);
  }
}
