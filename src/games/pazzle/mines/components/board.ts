import { Symbol } from "../gameObjects/symbol";

export default class Board extends Phaser.GameObjects.Container {
  allSymbol: Array<Symbol> = [];

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.scene.add.existing(this);

    this.init();
  }

  init() {
    this.addSymbols();
    // console.log(this.getBounds().width / 2);
  }

  addSymbols() {
    const padding = 70;
    let posX = 0;
    let posY = 0;

    for (let i = 1; i <= 25; i++) {
      const symbol = new Symbol(this.scene, posX, posY);
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
}
