import { Indicators } from "../ui/indicators";

export class Main extends Phaser.Scene {
  constructor() {
    super("Main");
  }

  create() {
    new Indicators(this, 0, 0);
  }
}
