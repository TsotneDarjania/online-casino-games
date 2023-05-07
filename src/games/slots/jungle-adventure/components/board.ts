import { getRandomFloat } from "../../../../helper/tatukaMath";
import { symbolsData } from "../data/symbolsData";
import { Symbol } from "./symbol";

export class Board {
  nextSymbols: Array<Symbol> = [];
  currentSymbols: Array<Symbol> = [];

  constructor(public scene: Phaser.Scene, public x: number, public y: number) {
    this.init();
  }

  init() {
    this.generateCurretnSymbols();
  }

  spin() {
    this.generateNextSymols();
    this.spinColumn(0);
  }

  spinColumn(columnIndex: number) {
    let firstSymbolIndex = columnIndex * 3;
    //select current column
    const currentColumn = this.scene.add.container(0, 0);
    for (let i = 0; i < 3; i++) {
      currentColumn.add(this.currentSymbols[firstSymbolIndex]);
      firstSymbolIndex += 1;
    }

    //reset
    firstSymbolIndex = columnIndex * 3;

    //select next column
    const nextColumn = this.scene.add.container(0, 0);
    for (let i = 0; i < 3; i++) {
      const symbol = this.nextSymbols[firstSymbolIndex].setVisible(true);
      nextColumn.add(symbol);
      firstSymbolIndex += 1;
    }

    const mask = this.scene.add.graphics();
    mask.fillRect(currentColumn.x, currentColumn.y, 300, 550);
    currentColumn.mask = new Phaser.Display.Masks.GeometryMask(
      this.scene,
      mask
    );

    const mask2 = this.scene.add.graphics();
    mask2.fillRect(currentColumn.x, currentColumn.y + 75, 300, 550);
    nextColumn.mask = new Phaser.Display.Masks.GeometryMask(this.scene, mask2);

    this.scene.tweens.add({
      targets: currentColumn,
      duration: 1000,
      y: 500,
    });
    this.scene.tweens.add({
      targets: nextColumn,
      duration: 1000,
      y: 500,
      onComplete: () => {
        for (let i = 0; i < 3; i++) {
          const postX = this.currentSymbols[i].x;
          const postY = this.currentSymbols[i].y;

          this.currentSymbols[i] = this.nextSymbols[i];
          this.currentSymbols[i].setPosition(postX, postY);
        }
        this.nextSymbols = [];
      },
    });
  }

  generateNextSymols() {
    const showSymbolsNumber = 15;
    const xPadding = 87;
    const yPadding = 83;

    let rowIndex = 1;
    let posX = this.x;
    let posY = this.y - yPadding * 3;

    for (let i = 0; i < showSymbolsNumber; i++) {
      const randomSymbolKey =
        Object.values(symbolsData)[
          Math.floor(getRandomFloat(0, Object.keys(symbolsData).length - 1))
        ].key;

      const symbol = new Symbol(
        this.scene,
        posX,
        posY,
        `symbol-${randomSymbolKey}`
      );
      symbol.setPosition(posX, posY);

      posY += yPadding;
      this.nextSymbols.push(symbol);

      rowIndex += 1;

      if (rowIndex > 3) {
        rowIndex = 1;
        posY = this.y - yPadding * 3;
        posX += xPadding;
      }
    }
  }

  generateCurretnSymbols() {
    const showSymbolsNumber = 15;
    const xPadding = 87;
    const yPadding = 83;

    let rowIndex = 1;
    let posX = this.x;
    let posY = this.y;

    for (let i = 0; i < showSymbolsNumber; i++) {
      const randomSymbolKey =
        Object.values(symbolsData)[
          Math.floor(getRandomFloat(0, Object.keys(symbolsData).length - 1))
        ].key;

      const symbol = new Symbol(
        this.scene,
        posX,
        posY,
        `symbol-${randomSymbolKey}`
      );
      symbol.setPosition(posX, posY);
      symbol.setVisible(true);
      posY += yPadding;
      this.currentSymbols.push(symbol);

      rowIndex += 1;

      if (rowIndex > 3) {
        rowIndex = 1;
        posY = this.y;
        posX += xPadding;
      }
    }
  }
}
