import { Board } from "../components/board";
import { GameManager } from "../core/gameManager";
import { UiInterface } from "../ui/uiInterface";
import { screenSize } from "../config/layutConfig";
import { calculatePercentage } from "../../../../helper/tatukaMath";

export class Main extends Phaser.Scene {
  screenWidth!: number;
  screenHeight!: number;

  board!: Board;
  uiInterface!: UiInterface;
  portraitWarning!: Phaser.GameObjects.Container;

  gameManager!: GameManager;

  frame!: Phaser.GameObjects.Image;

  constructor() {
    super("Main");
  }

  create() {
    this.screenWidth = this.game.canvas.width;
    this.screenHeight = this.game.canvas.height;
    this.portraitWarning = this.add
      .container(0, 0)
      .setDepth(200)
      .setVisible(false);

    this.addBackground();
    this.addFrame();

    this.gameManager = new GameManager(this);
    this.board = new Board(this);
    this.uiInterface = new UiInterface(this, 0, 0);

    this.createPortraitWarning();
    this.addOrientationEvent();
  }

  addBackground() {
    this.add
      .image(0, 0, "gameplayBackground")
      .setDisplaySize(this.screenWidth, this.screenHeight)
      .setOrigin(0);
  }

  addFrame() {
    this.frame = this.add
      .image(
        this.screenWidth / 2,
        this.screenHeight / 2 + screenSize().frame.y,
        "frame"
      )
      .setAlpha(1)
      .setOrigin(0.488, 0.4)
      .setDisplaySize(
        calculatePercentage(
          screenSize().frame.widthPercent,
          document.body.clientWidth
        ),
        calculatePercentage(
          screenSize().frame.heihtPercent,
          document.body.clientHeight
        )
      );
  }

  addOrientationEvent() {
    if (this.game.scale.isPortrait) {
      this.portraitWarning.setVisible(true);
      this.scale.stopFullscreen();
    } else {
      this.portraitWarning.setVisible(false);
      this.scale.startFullscreen();
    }

    this.scale.on(Phaser.Scale.Events.ORIENTATION_CHANGE, () => {
      if (this.game.scale.isPortrait) {
        this.portraitWarning.setVisible(true);
        this.scale.resize(this.game.canvas.height, this.game.canvas.width);
        this.renderer.resize(this.game.canvas.width, this.game.canvas.height);

        this.scale.removeAllListeners();
        this.scene.restart();
      } else {
        this.portraitWarning.setVisible(false);
        this.scale.resize(this.game.canvas.height, this.game.canvas.width);
        this.renderer.resize(this.game.canvas.width, this.game.canvas.height);

        this.scale.removeAllListeners();
        this.scene.restart();
      }
    });
  }

  createPortraitWarning() {
    const background = this.add
      .image(0, 0, "white")
      .setOrigin(0)
      .setDisplaySize(this.screenWidth, this.screenHeight)
      .setTint(0x1f2021);

    this.portraitWarning.add(background);

    const text = this.add
      .text(
        this.screenWidth / 2,
        this.screenHeight / 2,
        ["Please rotate your", "mobile to horizontal"],
        {
          align: "center",
          fontSize: "20px",
          color: "yellow",
          lineSpacing: 20,
          fixedWidth: calculatePercentage(90, this.screenWidth),
        }
      )
      .setOrigin(0.5);

    this.portraitWarning.add(text);
  }
}
