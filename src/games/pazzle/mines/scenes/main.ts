import { getRandomFloat } from "../../../../helper/tatukaMath";
import { BackgroundStar } from "../components/backgroundStar";
import Board from "../components/board";
import { Interface } from "../components/interface";
import { gameDataConfig } from "../config/gameDataConfig";
import { GameManager } from "../gameManage";

export class Main extends Phaser.Scene {
  screenWidth!: number;
  screenHeight!: number;

  board!: Board;
  interface!: Interface;
  gameManager!: GameManager;

  constructor() {
    super("Main");
  }

  create() {
    this.screenWidth = this.game.canvas.width;
    this.screenHeight = this.game.canvas.height;

    this.addBackgroundStars();
    this.addBoard();
    this.addInterface();

    this.gameManager = new GameManager(this, gameDataConfig);
  }

  addInterface() {
    this.interface = new Interface(this);
  }

  addBoard() {
    this.board = new Board(this, this.screenWidth / 2, this.screenHeight / 2);
    //set center coordinates
    this.board.setPosition(
      this.board.x - this.board.getBounds().width / 2,
      this.board.y - this.board.getBounds().height / 2
    );
  }

  addBackgroundStars() {
    const starsNumber = 14;
    let animationDeley = 0;

    for (let i = 0; i < starsNumber; i++) {
      const x = getRandomFloat(0, this.screenWidth);
      const y = getRandomFloat(0, this.screenHeight);
      new BackgroundStar(this, x, y, "background-star", animationDeley);

      //To create a chaotic impression, we need the animation to start at different times
      animationDeley += 1000;
    }
  }
}
