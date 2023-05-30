import { Scene } from "phaser";
import { getRandomFloat } from "../../../../helper/tatukaMath";
import { GameConfig, gameConfig } from "../config/gameConfig";
import { symbolsData } from "../data/symbolsData";
import { Main } from "../scenes/main";
import { Display } from "./display";
import { Symbol } from "../components/symbol";

export class GameManager {
  config: GameConfig = gameConfig;
  betIndex!: number;
  bet!: number;

  targetStrip: Array<Array<number>> = [];
  allTargetSymols: Array<Symbol> = [];

  display!: Display;

  constructor(public mainScene: Main) {
    this.init();
  }

  init() {
    this.betIndex = this.config.defaultBetIndex;
    this.bet = this.config.bets[this.betIndex];

    this.generateRandomTargetStrip();

    this.display = new Display(this.mainScene);
  }

  increaseBet() {
    this.betIndex =
      (this.betIndex + 1 + gameConfig.bets.length) % gameConfig.bets.length;
    this.bet = gameConfig.bets[this.betIndex];
    this.display.updateBetText(this.bet);
  }

  decreaseBet() {
    this.betIndex =
      (this.betIndex - 1 + gameConfig.bets.length) % gameConfig.bets.length;
    this.bet = gameConfig.bets[this.betIndex];
    this.display.updateBetText(this.bet);
  }

  spin() {
    this.allTargetSymols = [];
    this.mainScene.board.spinAllColumns();
    this.mainScene.uiInterface.desableInterface();
  }

  completeSpin() {
    this.checkWin();
    this.generateRandomTargetStrip();
  }

  checkWin() {
    this.cheeckPayoutLines();
  }

  cheeckPayoutLines() {
    const allResultsIndex: Array<number> = [];
    this.targetStrip.forEach((column) => {
      column.forEach((symbol) => {
        allResultsIndex.push(symbol);
      });
    });

    const lines: Array<Array<number>> = [
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ];
    for (let i = 0; i < this.config.payOutLines.length; i++) {
      for (let f = 0; f < this.config.payOutLines[i].length; f++) {
        lines[i].push(allResultsIndex[this.config.payOutLines[i][f]]);
      }
    }

    for (let i = 0; i < lines.length; i++) {
      if (this.isWinPayoutLine(lines[i])) {
        this.playPayOutLineAnimation(i);
      }
    }
  }

  playPayOutLineAnimation(index: number) {
    this.config.payOutLines[index].forEach((symbolIndex) => {
      this.allTargetSymols[symbolIndex].playAnimation();
    });
  }

  isWinPayoutLine(line: Array<number>) {
    let isSame = true;
    const firstIndex = line[0];
    line.forEach((index) => {
      if (index != firstIndex) {
        isSame = false;
      }
    });

    return isSame;
  }

  generateRandomTargetStrip() {
    this.targetStrip = [];
    for (let i = 0; i < 5; i++) {
      let strip = [];
      for (let j = 0; j < 3; j++) {
        strip.push(
          Math.floor(getRandomFloat(0, Object.keys(symbolsData).length))
        );
      }
      this.targetStrip.push(strip);
    }
  }
}
