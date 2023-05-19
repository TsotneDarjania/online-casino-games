import { Main } from "../scenes/main";
import { Column } from "./column";

export class Board extends Phaser.GameObjects.Layer {
  currentColumns: Array<Column> = [];
  nextColumns: Array<Column> = [];

  paddingX = 160;

  allColumnsContainer!: Phaser.GameObjects.Container;

  currentTween!: Phaser.Tweens.Tween;
  nextTween!: Phaser.Tweens.Tween;

  constructor(public scene: Main, public x: number, public y: number) {
    super(scene);
    this.init();
  }

  init() {
    this.initCurrentColumns();
    this.initNextColumns();

    this.allColumnsContainer = this.scene.add.container(0, 0);
    this.allColumnsContainer.add(this.currentColumns);
    this.allColumnsContainer.add(this.nextColumns);

    const currentMask = this.scene.add.graphics();
    currentMask.fillRect(0, 80, 1100, 490);
    this.allColumnsContainer.mask = new Phaser.Display.Masks.GeometryMask(
      this.scene,
      currentMask
    );
  }

  spinAllColumns() {
    this.spinColumn(0, 11);
    this.spinColumn(1, 14);
    this.spinColumn(2, 17);
    this.spinColumn(3, 20);
    this.spinColumn(4, 23);
  }

  spinColumn(columnIndex: number, spinNumber: number) {
    this.nextColumns[columnIndex].setVisible(true);

    //current
    this.currentTween = this.scene.add.tween({
      targets: this.currentColumns[columnIndex],
      duration: 150,
      y: 630,
      onComplete: () => {
        this.currentColumns[columnIndex].removeAll(true);
        this.currentColumns[columnIndex] = this.nextColumns[columnIndex];
      },
    });

    //next
    this.nextTween = this.scene.add.tween({
      targets: this.nextColumns[columnIndex],
      duration: 150,
      y: 155,
      onComplete: () => {
        this.createNextColumn(columnIndex);
        spinNumber -= 1;
        if (spinNumber > 0) {
          this.spinColumn(columnIndex, spinNumber);
        }
        if (spinNumber === 0 && columnIndex === 4) {
          this.completeSpin();
        }
      },
    });
  }

  createNextColumn(columnIndex: number) {
    let posX = this.x;
    posX += this.paddingX * columnIndex + 1;

    const column = this.createColumn(posX, this.y - 490);
    column.setVisible(false);
    this.nextColumns[columnIndex] = column;
    this.allColumnsContainer.add(column);
  }

  initNextColumns() {
    let posX = this.x;
    for (let i = 0; i < 5; i++) {
      const column = this.createColumn(posX, this.y - 490);
      column.setVisible(false);
      this.nextColumns[i] = column;
      posX += this.paddingX;
    }
  }

  initCurrentColumns() {
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

  completeSpin() {
    this.scene.indicators.enableInterface();
  }
}
