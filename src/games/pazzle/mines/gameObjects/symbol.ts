export class Symbol extends Phaser.GameObjects.Container {
  background!: Phaser.GameObjects.Image;

  correctSymbol!: Phaser.GameObjects.Image;
  wrongSymbol!: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.scene.add.existing(this);

    this.init();
  }

  init() {
    this.addBackground();
    this.createCorrectSymbol();
    this.createWrongSymbol();
  }

  createCorrectSymbol() {
    this.correctSymbol = this.scene.add
      .image(0, 0, "background-star")
      .setTint(0xffe08b)
      .setVisible(false)
      .setAlpha(0)
      .setScale(0);

    this.add(this.correctSymbol);
  }

  createWrongSymbol() {
    this.wrongSymbol = this.scene.add
      .image(0, 0, "bomb")
      .setVisible(false)
      .setAlpha(0)
      .setScale(0);

    this.add(this.wrongSymbol);
  }

  addBackground() {
    this.background = this.scene.add
      .image(0, 0, "symbol-background")
      .setTint(0x848c91)
      .setOrigin(0)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {});

    this.add(this.background);
  }

  showCorrectAnswer() {
    this.background.setTint(0x6f5cc7);
    this.correctSymbol.setVisible(true);

    this.showSymbolAnimation(this.correctSymbol, 0.4);
  }

  showWrongAnswer() {
    this.background.setTint(0xd6498b);
    this.wrongSymbol.setVisible(true);

    this.showSymbolAnimation(this.wrongSymbol, 0.7);
  }

  showSymbolAnimation(symbol: Phaser.GameObjects.Image, scale: number) {
    this.scene.add.tween({
      targets: symbol,
      duration: 100,
      scale: scale,
      alpha: 1,
    });
  }
}
