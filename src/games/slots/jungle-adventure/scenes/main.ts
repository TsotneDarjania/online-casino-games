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
  pressToStart!: Phaser.GameObjects.Container;

  canvasHideWidth = window.outerWidth - window.innerWidth;
  canvasHideHeight = window.outerHeight - window.innerHeight;

  gameManager!: GameManager;

  frame!: Phaser.GameObjects.Image;

  constructor() {
    super("Main");
  }

  create() {
    this.scale.on(Phaser.Scale.Events.LEAVE_FULLSCREEN, () => {
      this.changeOrientationSize();
    });

    this.screenWidth = this.game.canvas.width;
    this.screenHeight = this.game.canvas.height;
    this.pressToStart = this.add
      .container(0, 0)
      .setDepth(300)
      .setVisible(false);
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
    this.createPressToStartScreen();
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
          this.game.canvas.width
        ),
        calculatePercentage(
          screenSize().frame.heihtPercent,
          this.game.canvas.height
        )
      );
  }

  createPressToStartScreen() {
    const background = this.add
      .image(0, 0, "white")
      .setOrigin(0)
      .setDisplaySize(this.screenWidth, this.screenHeight)
      .setTint(0x1f2021);

    this.pressToStart.add(background);

    const text = this.add
      .text(this.screenWidth / 2, this.screenHeight / 2, ["Press To Start"], {
        align: "center",
        fontSize: "20px",
        color: "yellow",
        lineSpacing: 20,
        fixedWidth: calculatePercentage(90, this.screenWidth),
      })
      .setOrigin(0.5);

    this.pressToStart.add(text);

    if (this.isMobileDevice() && this.scale.isFullscreen === false) {
      this.pressToStart.setVisible(true);
    }

    this.scale.on(Phaser.Scale.Events.ENTER_FULLSCREEN, () => {
      this.pressToStart.setVisible(false);
    });

    this.pressToStart
      .setInteractive(
        new Phaser.Geom.Rectangle(0, 0, this.screenWidth, this.screenHeight),
        Phaser.Geom.Rectangle.Contains
      )
      .on(Phaser.Input.Events.POINTER_UP, () => {
        this.pressToStart.setVisible(false);

        this.game.canvas.height = window.outerWidth + this.canvasHideWidth;
        this.game.canvas.width = window.outerHeight + this.canvasHideHeight;

        if (this.game.scale.isPortrait) {
          this.scale.resize(this.game.canvas.height, this.game.canvas.width);
          this.renderer.resize(this.game.canvas.width, this.game.canvas.height);
        } else {
          this.scale.resize(this.game.canvas.height, this.game.canvas.width);
          this.renderer.resize(this.game.canvas.width, this.game.canvas.height);
        }

        this.scene.restart();

        this.scale.startFullscreen();
      });
  }

  isMobileDevice() {
    const userAgent = navigator.userAgent;

    // Check if the user agent string contains any keywords indicating a mobile device
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );
  }

  addOrientationEvent() {
    if (this.game.scale.isPortrait) {
      this.portraitWarning.setVisible(true);
    }

    this.scale.on(Phaser.Scale.Events.ORIENTATION_CHANGE, () => {
      this.changeOrientationSize();
    });
  }

  changeOrientationSize() {
    this.game.canvas.height = window.outerWidth - this.canvasHideWidth;
    this.game.canvas.width = window.outerHeight - this.canvasHideHeight;

    if (this.game.scale.isPortrait) {
      this.portraitWarning.setVisible(true);
      this.scale.resize(this.game.canvas.height, this.game.canvas.width);
      this.renderer.resize(this.game.canvas.width, this.game.canvas.height);

      this.scale.removeAllListeners();
    } else {
      this.portraitWarning.setVisible(false);
      this.scale.resize(this.game.canvas.height, this.game.canvas.width);
      this.renderer.resize(this.game.canvas.width, this.game.canvas.height);

      this.scale.removeAllListeners();
    }

    this.scale.on(Phaser.Scale.Events.RESIZE, () => {
      this.scene.restart();
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
