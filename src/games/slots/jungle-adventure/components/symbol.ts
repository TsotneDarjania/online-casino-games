import { calculatePercentage } from "../../../../helper/tatukaMath";
import { screenSize } from "../config/layutConfig";
import { Main } from "../scenes/main";

export class Symbol extends Phaser.GameObjects.Container {
  rectangle!: Phaser.GameObjects.Image;
  image!: Phaser.GameObjects.Image;

  constructor(public scene: Main, x: number, y: number, public key: string) {
    super(scene, x, y);

    this.createRectangle();
    this.createImage();

    this.scene.add.existing(this);
  }

  playAnimation() {
    this.scene.tweens.add({
      targets: this.image,
      yoyo: true,
      duration: 150,
      scale: 1.4,
      repeat: 2,
      onComplete: () => {
        this.image.setTint(0xffffff);
        this.rectangle.setTint(0x331109);
      },
    });

    this.image.setTint(0xfab630);
    this.rectangle.setTint(0x140804);
  }

  createImage() {
    this.image = this.scene.add
      .image(
        this.x + this.rectangle.displayWidth / 2,
        this.y + this.rectangle.displayHeight / 2,
        this.key
      )
      .setDisplaySize(
        calculatePercentage(
          screenSize().board.symbol.withPercent,
          this.scene.frame.displayWidth
        ),
        calculatePercentage(
          screenSize().board.symbol.heightPercent,
          this.scene.frame.displayWidth
        )
      )
      .setOrigin(0.5);
    this.add(this.image);
  }

  createRectangle() {
    this.rectangle = this.scene.add
      .image(this.x, this.y, "white")
      .setDisplaySize(
        calculatePercentage(
          screenSize().board.symbol.withPercent,
          this.scene.frame.displayWidth
        ),
        calculatePercentage(
          screenSize().board.symbol.heightPercent,
          this.scene.frame.displayWidth
        )
      )
      .setTint(0x331109)
      .setOrigin(0)
      .setAlpha(0.8);

    this.add(this.rectangle);
  }
}
