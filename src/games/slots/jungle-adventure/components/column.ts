import { getRandomFloat } from "../../../../helper/tatukaMath";
import { symbolsData } from "../data/symbolsData";
import { Symbol } from "./symbol";

export class Column extends Phaser.GameObjects.Container {
  paddingY: number = 80;
  constructor(
    public scene: Phaser.Scene,
    x: number,
    y: number,
    public isRandom: boolean
  ) {
    super(scene, x, y);
    this.scene.add.existing(this);
    this.init();
  }
  init() {
    this.isRandom && this.createRandomColumn();
  }

  createRandomColumn() {
    let positionY = 0;
    for (let index = 0; index < 3; index++) {
      this.createSymbol(positionY, this.getRandomImageKey());
      positionY += this.paddingY;
    }
  }

  createTargetColumn(stripNumbers: Array<number>) {
    let positionY = 0;
    for (let index = 0; index < 3; index++) {
      this.createSymbol(
        positionY,
        Object.values(symbolsData)[stripNumbers[index]].key
      );
      positionY += this.paddingY;
    }
  }

  createSymbol(positionY: number, imageKey: string) {
    const symbol = new Symbol(this.scene, 0, positionY, imageKey);
    this.add(symbol);
  }

  getRandomImageKey() {
    return Object.values(symbolsData)[
      Math.floor(getRandomFloat(0, Object.keys(symbolsData).length - 1))
    ].key;
  }
}
