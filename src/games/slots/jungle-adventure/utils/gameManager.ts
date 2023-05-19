import { getRandomFloat } from "../../../../helper/tatukaMath";
import { symbolsData } from "../data/symbolsData";
import { Main } from "../scenes/main";

export class GameManager {
  targetStrip: Array<Array<number>> = [];

  constructor(public mainScene: Main) {
    this.init();
  }

  init() {
    this.generateRandomTargetStrip();
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
