import { getRandomFloat } from "../../../../helper/tatukaMath";
import { Symbol } from "../gameObjects/symbol";
import { Main } from "../scenes/main";

export default class Board extends Phaser.GameObjects.Container {
  allSymbol: Array<Symbol> = [];
  bombs: Array<number> = [];

  constructor(public scene: Main, x: number, y: number) {
    super(scene, x, y);
    this.scene.add.existing(this);

    this.init();
  }

  init() {
    this.addSymbols();
  }

  addSymbols() {
    const padding = 70;
    let posX = 0;
    let posY = 0;

    for (let i = 1; i <= 25; i++) {
      const symbol = new Symbol(this.scene, posX, posY);
      symbol.background.on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.clickSymbol(i - 1, symbol);
      });
      this.allSymbol.push(symbol);
      //calculate positions for next symbol
      posX += padding;
      if (i % 5 === 0 && i != 0) {
        posX = 0;
        posY += padding;
      }
    }

    this.add(this.allSymbol);
  }

  generateBombs(bombsNumber: number) {
    for (let index = 0; index < bombsNumber; index++) {
      let randomIndex = Math.floor(getRandomFloat(0, 25));
      //The bombs should be on a different location, here we check
      // if this number is already in this array for bombs
      while (this.bombs.includes(randomIndex) === true) {
        randomIndex = Math.floor(getRandomFloat(0, 25));
      }
      this.bombs.push(randomIndex);
    }
  }

  makeActive() {
    this.allSymbol.forEach((symbol) => {
      symbol.background.setTint(0xd6deed);
      symbol.background.setInteractive({ cursor: "pointer" });
    });
  }

  makeDeactive() {
    this.allSymbol.forEach((symbol) => {
      symbol.background.setTint(0x848c91);
      symbol.background.disableInteractive();

      symbol.correctSymbol.setVisible(false);
      symbol.correctSymbol.setAlpha(0);
      symbol.correctSymbol.setScale(0);

      symbol.wrongSymbol.setAlpha(0);
      symbol.wrongSymbol.setScale(0);
      symbol.wrongSymbol.setVisible(false);
    });
  }

  clickSymbol(symbolIndex: number, symbol: Symbol) {
    if (this.bombs.includes(symbolIndex)) {
      symbol.showWrongAnswer();
      this.scene.gameManager.loose();
    } else {
      symbol.showCorrectAnswer();
      this.scene.gameManager.addCorrectAnswer();
    }
  }
}
