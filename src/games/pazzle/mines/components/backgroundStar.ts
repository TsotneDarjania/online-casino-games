import { getRandomFloat } from "../../../../helper/tatukaMath";

export class BackgroundStar extends Phaser.GameObjects.Image {
  screenWidth!: number;
  screenHeight!: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    public animationDeley: number
  ) {
    super(scene, x, y, key);
    this.scene.add.existing(this);

    this.init();
  }

  init() {
    this.screenWidth = this.scene.game.canvas.width;
    this.screenHeight = this.scene.game.canvas.height;
    this.scale = 0;
    this.setAlpha(0.5);
    this.setTint(0x202224);

    this.addAnimation();
  }

  addAnimation() {
    let scale = getRandomFloat(0.2, 0.6);

    this.scene.add.tween({
      targets: this,
      duration: 600,
      scale: scale,
      yoyo: true,
      loop: -1,
      delay: this.animationDeley,
      onLoop: () => {
        this.changePosition();
        scale = getRandomFloat(0.2, 0.6);
      },
    });
  }

  changePosition() {
    const x = getRandomFloat(this.width, this.screenWidth - this.width);
    const y = getRandomFloat(this.height, this.screenHeight - this.height);

    this.setPosition(x, y);
  }
}
