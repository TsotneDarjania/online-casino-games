import { Column } from "./column";

export class Board extends Phaser.GameObjects.Layer {
  currentColumns: Array<Column> = [];
  nextColumns: Array<Column> = [];

  paddingX = 160;

  constructor(public scene: Phaser.Scene, public x: number, public y: number) {
    super(scene);
    this.init();
  }

  init() {
    this.createCurrentColumns();
    this.createNextColumns();
  }

  spinAllColumns() {
    this.spinColumn(0);
  }

  spinColumn(columnIndex: number) {
    //current8
    this.scene.add.tween({
      targets: this.currentColumns[columnIndex],
      duration: 1000,
      y: 650,
      onComplete: () => {
        this.currentColumns[columnIndex].removeAll(true);
        this.currentColumns[columnIndex] = this.nextColumns[columnIndex];
        // this.currentColumns[columnIndex].setVisible(false);
      },
    });

    //next
    this.scene.add.tween({
      targets: this.nextColumns[columnIndex],
      duration: 1200,
      y: 155,
      onComplete: () => {
        this.createNextColumns();
      },
    });
  }

  createNextColumns() {
    let posX = this.x;
    for (let i = 0; i < 5; i++) {
      const column = this.createColumn(posX, this.y - 490);
      this.nextColumns[i] = column;
      posX += this.paddingX;
    }
  }

  createCurrentColumns() {
    let posX = this.x;
    for (let i = 0; i < 5; i++) {
      const column = this.createColumn(posX, this.y);
      this.currentColumns.push(column);
      posX += this.paddingX;
    }
  }

  createColumn(x: number, y: number) {
    return new Column(this.scene, x, y);
  }
}
