export class Symbol extends Phaser.GameObjects.Container {
  rectangle!: Phaser.GameObjects.Image;
  image!: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number, public key: string) {
    super(scene, x, y);

    this.createRectangle();
    this.createImage();

    this.scene.add.existing(this);
  }

  createImage() {
    this.image = this.scene.add.image(this.x, this.y, this.key).setScale(1.1);
    this.add(this.image);
  }

  createRectangle() {
    this.rectangle = this.scene.add
      .image(this.x, this.y, "white")
      .setDisplaySize(130, 130)
      .setTint(0x331109)
      .setAlpha(0.8);

    this.add(this.rectangle);
  }
}
