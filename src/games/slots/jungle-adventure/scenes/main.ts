import { Board } from "../components/board";
import { Indicators } from "../ui/indicators";

export class Main extends Phaser.Scene {
  screenWidth!: number;
  screenHeight!: number;

  board!: Board;
  indicators!: Indicators;

  constructor() {
    super("Main");
  }

  create() {
    this.screenWidth = this.game.canvas.width;
    this.screenHeight = this.game.canvas.height;

    this.addBackground();
    this.addFrame();

    this.board = new Board(this, 260, 155);
    this.indicators = new Indicators(this, 0, 0);
  }

  addBackground() {
    this.add
      .image(0, 0, "gameplayBackground")
      .setDisplaySize(1500, 900)
      .setOrigin(0);
  }

  addFrame() {
    this.add
      .image(this.screenWidth / 2, 414, "frame")
      .setAlpha(1)
      .setDisplaySize(1300, 920);
  }
}
