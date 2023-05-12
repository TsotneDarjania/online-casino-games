import { calculatePercentage } from "../../../helper/tatukaMath";
import { GameDataConfig } from "./config/gameDataConfig";
import { Main } from "./scenes/main";

export class GameManager {
  mines!: number;
  betIndex!: number;
  totalBalance!: number;
  cashOutBalance: number = 0;

  nextAmount: number = 0;

  correctAnswerBonus = 0;

  constructor(public scene: Main, public config: GameDataConfig) {
    this.mines = config.mines;
    this.betIndex = config.user.betIndex;
    this.totalBalance = config.user.totalBalance;

    this.init();
  }

  init() {
    this.addEventListeners();
    this.calculateNextAmount();
  }

  addCorrectAnswer() {
    this.calculateCashOutBalace();
    this.calculateNextAmount();

    this.correctAnswerBonus += calculatePercentage(12, this.cashOutBalance);

    if (this.scene.interface.cashOutButton.visible === false) {
      this.scene.interface.cashOutButton.setVisible(true);
      this.scene.interface.cashOutText.setVisible(true);
    }
  }

  loose() {}

  calculateCashOutBalace() {
    this.cashOutBalance = this.nextAmount;
    this.updateCashOutText(this.cashOutBalance);
  }

  updateCashOutText(value: number) {
    this.scene.interface.cashOutText.setText(`${value.toFixed(2)}$`);
  }

  addEventListeners() {
    //bet button
    this.scene.interface.betButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.clickBetButton();
    });

    //mine button
    this.scene.interface.mineButton.on("click", () => {
      this.clickMinesButton();
    });

    this.scene.interface.plusButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.increaseBet();
    });
    this.scene.interface.minusButton.on(
      Phaser.Input.Events.POINTER_DOWN,
      () => {
        this.decreaseBet();
      }
    );

    //cash out button
    this.scene.interface.cashOutButton.on(
      Phaser.Input.Events.POINTER_DOWN,
      () => {
        this.cashOut();
      }
    );

    this.scene.interface.betOptionsButton.on(
      Phaser.Input.Events.POINTER_DOWN,
      () => {
        this.openBetOptionsModal();
      }
    );
  }

  cashOut() {
    this.totalBalance += this.cashOutBalance;
    this.updateTotalBalanceText(this.totalBalance);

    this.reset();
  }

  reset() {
    this.correctAnswerBonus = 0;
    this.updateNextText(this.config.bets[this.betIndex]);
    this.scene.board.makeDeactive();
    this.scene.board.bombs = [];

    this.scene.interface.cashOutButton.setVisible(false);
    this.scene.interface.cashOutText.setVisible(false);
    this.scene.interface.betButton.setVisible(true);

    //ctive interface buttons
    this.scene.interface.betButton.setInteractive();
    this.scene.interface.betButton.setTint(0xffffff);

    this.scene.interface.betOptionsButton.setInteractive();
    this.scene.interface.betOptionsButton.setTint(0xffffff);

    this.scene.interface.plusButton.setInteractive();
    this.scene.interface.plusButton.setTint(0xffffff);

    this.scene.interface.minusButton.setInteractive();
    this.scene.interface.minusButton.setTint(0xffffff);

    this.scene.interface.mineButton.setInteractive();
    this.scene.interface.mineButton.addListener("click");
    this.scene.interface.mineButton.on("click", () => {
      this.clickMinesButton();
    });
    const mineButton = this.scene.interface.mineButton.node as HTMLElement;
    mineButton.style.backgroundColor = "#403E3C";
  }

  increaseBet() {
    if (this.config.bets.length > this.betIndex + 1) {
      this.betIndex += 1;
    }
    this.updateBetText(this.config.bets[this.betIndex]);
    this.calculateNextAmount();
  }

  decreaseBet() {
    if (this.betIndex > 0) {
      this.betIndex -= 1;
    }
    this.updateBetText(this.config.bets[this.betIndex]);
    this.calculateNextAmount();
  }

  changeBet(betIndex: number) {
    this.betIndex = betIndex;
    this.updateBetText(this.config.bets[this.betIndex]);
    this.calculateNextAmount();
  }

  openBetOptionsModal() {
    this.scene.interface.minesOptionModal.setVisible(false);
    this.scene.interface.betOptionsModal.visible
      ? this.scene.interface.betOptionsModal.setVisible(false)
      : this.scene.interface.betOptionsModal.setVisible(true);
  }

  changMinesNumber(mines: number) {
    this.mines = mines;
    this.calculateNextAmount();
  }

  updateBetText(value: number) {
    this.scene.interface.betText.setText(value + "$");
  }

  updateNextText(value: number) {
    this.scene.interface.nextText.setText("NEXT " + value.toFixed(2) + " USD");
  }

  updateTotalBalanceText(value: number) {
    this.scene.interface.totalBalanceText.setText(
      `TOTAL ${value.toFixed(2)} ${this.config.user.currency}`
    );
  }

  clickMinesButton() {
    this.scene.interface.betOptionsModal.setVisible(false);
    this.scene.interface.minesOptionModal.visible
      ? this.scene.interface.minesOptionModal.setVisible(false)
      : this.scene.interface.minesOptionModal.setVisible(true);
  }

  calculateNextAmount() {
    const bet: number = this.config.bets[this.betIndex];

    this.nextAmount =
      bet + calculatePercentage(8 + this.mines, bet) + this.correctAnswerBonus;
    console.log(this.nextAmount);

    this.updateNextText(this.nextAmount);
  }

  clickBetButton() {
    this.cashOutBalance = this.config.bets[this.betIndex];
    this.correctAnswerBonus = calculatePercentage(12, this.cashOutBalance);
    this.scene.board.generateBombs(this.mines);
    this.scene.board.makeActive();
    this.totalBalance = this.totalBalance - this.config.bets[this.betIndex];
    this.updateTotalBalanceText(this.totalBalance);

    //deactive other interface buttons
    this.scene.interface.betButton.disableInteractive();
    this.scene.interface.betButton.setTint(0x44434d);

    this.scene.interface.betOptionsButton.disableInteractive();
    this.scene.interface.betOptionsButton.setTint(0x44434d);

    this.scene.interface.plusButton.disableInteractive();
    this.scene.interface.plusButton.setTint(0x44434d);

    this.scene.interface.minusButton.disableInteractive();
    this.scene.interface.minusButton.setTint(0x44434d);

    this.scene.interface.mineButton.disableInteractive();

    this.scene.interface.mineButton.removeAllListeners();
    const mineButton = this.scene.interface.mineButton.node as HTMLElement;
    mineButton.style.backgroundColor = "#17161A";
  }
}
