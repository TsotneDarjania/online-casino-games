export class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.setPath(`../../assets/games/jungle-adventure/`);

    //fonts
    this.load.webFont("mainFont", "fonts/BebasNeue-Regular.woff2");

    //common
    this.load.image("white", "images/common/white.png");

    //ui
    this.load.image("spinButton", "images/ui/spin.png");
    this.load.image("arrowButton", "images/ui/arrow.png");

    //gameplat
    this.load.image("gameplayBackground", "images/background.jpg");
    this.load.image("frame", "images/frame.png");

    //symbols
    this.load.image("symbol-tiger", "images/symbols/tiger.png");
    this.load.image("symbol-lion", "images/symbols/lion.png");
    this.load.image("symbol-monkey", "images/symbols/monkey.png");
    this.load.image("symbol-banana", "images/symbols/banana.png");
    this.load.image("symbol-coconut", "images/symbols/coconut.png");
    this.load.image("symbol-ananas", "images/symbols/ananas.png");
    this.load.image("symbol-binocular", "images/symbols/binocular.png");
    this.load.image("symbol-compass", "images/symbols/compass.png");
    this.load.image("symbol-rope", "images/symbols/rope.png");
    this.load.image("symbol-traveller", "images/symbols/traveller.png");
    this.load.image("symbol-treasure", "images/symbols/treasure.png");
  }

  create() {
    this.scene.start("Main");
  }
}
