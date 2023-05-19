import { Board } from "../components/board";
import { GameManager } from "../utils/gameManager";
import { UiInterface } from "../ui/uiInterface";

export class Main extends Phaser.Scene {
  screenWidth!: number;
  screenHeight!: number;

  board!: Board;
  uiInterface!: UiInterface;

  gameManager!: GameManager;

  constructor() {
    super("Main");
  }

  create() {
    this.screenWidth = this.game.canvas.width;
    this.screenHeight = this.game.canvas.height;

    this.addBackground();
    this.addFrame();

    this.gameManager = new GameManager(this);
    this.board = new Board(this, 260, 155);
    this.uiInterface = new UiInterface(this, 0, 0);
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
