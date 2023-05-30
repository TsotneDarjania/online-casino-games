import { gameConfig } from "../config/gameConfig";
import { Main } from "../scenes/main";

export class Display {
  currencySymbol = gameConfig.currencySymbol;
  constructor(public scene: Main) {}

  updateBetText(value: number) {
    const stringValue = value.toFixed(2);
    this.scene.uiInterface.betText.setText(
      `${stringValue + this.currencySymbol}`
    );
  }
}
