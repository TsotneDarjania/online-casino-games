import { calculatePercentage } from "../../../../helper/tatukaMath";
import { screenSize } from "../config/layutConfig";
import { Main } from "../scenes/main";
import { Column } from "./column";

export class Board extends Phaser.GameObjects.Layer {
  currentColumns: Array<Column> = [];
  nextColumns: Array<Column> = [];

  paddingX = 0;

  width = 0;
  height = 0;

  allColumnsContainer!: Phaser.GameObjects.Container;

  currentTween!: Phaser.Tweens.Tween;
  nextTween!: Phaser.Tweens.Tween;

  constructor(public scene: Main) {
    super(scene);
    this.init();
  }

  init() {
    this.paddingX = calculatePercentage(13, this.scene.frame.displayWidth);

    this.initCurrentColumns();
    this.initNextColumns();

    this.allColumnsContainer = this.scene.add.container(0, 0);
    this.allColumnsContainer.add(this.currentColumns);

    const currentMask = this.scene.add.graphics();
    currentMask.fillRect(
      this.scene.screenWidth / 2 -
        this.allColumnsContainer.getBounds().width / 2,
      this.scene.screenHeight / 2 -
        this.allColumnsContainer.getBounds().height / 2 +
        screenSize().frame.y,
      this.allColumnsContainer.getBounds().width,
      this.allColumnsContainer.getBounds().height
    );
    this.allColumnsContainer.mask = new Phaser.Display.Masks.GeometryMask(
      this.scene,
      currentMask
    );

    this.allColumnsContainer.setPosition(
      this.scene.screenWidth / 2 -
        this.allColumnsContainer.getBounds().width / 2,
      this.scene.screenHeight / 2 -
        this.allColumnsContainer.getBounds().height / 2 +
        screenSize().frame.y
    );

    this.allColumnsContainer.add(this.nextColumns);
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
      y: screenSize().board.currentTween.y,
      onComplete: () => {
        this.currentColumns[columnIndex].removeAll(true);
        this.currentColumns[columnIndex] = this.nextColumns[columnIndex];
      },
    });

    //next
    this.nextTween = this.scene.add.tween({
      targets: this.nextColumns[columnIndex],
      duration: 150,
      y: 0,
      onComplete: () => {
        this.createNextColumn(columnIndex, spinNumber);
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

  createNextColumn(columnIndex: number, spinNumber: number) {
    let posX = 0;
    posX += this.paddingX * columnIndex + 1;

    if (spinNumber === 2) {
      const column = this.createTargetColumn(
        posX,
        screenSize().board.nextColumnPositionY,
        this.scene.gameManager.targetStrip[columnIndex]
      );
      column.setVisible(false);
      this.nextColumns[columnIndex] = column;
      this.allColumnsContainer.add(column);
    } else {
      const column = this.createColumn(
        posX,
        screenSize().board.nextColumnPositionY
      );
      column.setVisible(false);
      this.nextColumns[columnIndex] = column;
      this.allColumnsContainer.add(column);
    }
  }

  initNextColumns() {
    let posX = 0;
    for (let i = 0; i < 5; i++) {
      const column = this.createColumn(
        posX,
        screenSize().board.nextColumnPositionY
      );
      column.setVisible(false);
      this.nextColumns[i] = column;
      posX += this.paddingX;
    }
  }

  initCurrentColumns() {
    let posX = 0;
    for (let i = 0; i < 5; i++) {
      const column = this.createColumn(posX, 0);
      this.currentColumns.push(column);
      posX += this.paddingX;
    }
  }

  createColumn(x: number, y: number) {
    return new Column(this.scene, x, y, true);
  }

  createTargetColumn(x: number, y: number, strip: Array<number>) {
    const column = new Column(this.scene, x, y, false);
    column.createTargetColumn(strip);
    return column;
  }

  completeSpin() {
    this.scene.uiInterface.enableInterface();
    this.scene.gameManager.generateRandomTargetStrip();
    this.scene.uiInterface.optionsModal.updateInputs();
  }
}
