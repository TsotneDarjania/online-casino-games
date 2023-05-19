import { Main } from "../scenes/main";

export class OptionsModal {
  inputs: Array<Array<Phaser.GameObjects.DOMElement>> = [[], [], [], [], []];
  background!: Phaser.GameObjects.DOMElement;
  title!: Phaser.GameObjects.DOMElement;

  closeButtonItems: Array<Phaser.GameObjects.DOMElement> = [];

  constructor(public scene: Main, public x: number, public y: number) {
    this.init();
  }

  init() {
    this.addBackground();
    this.addTitle();
    this.addInputs();

    this.addCloseButton();
  }

  updateInputs() {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 3; j++) {
        //@ts-ignore
        this.inputs[i][j].node.value = this.scene.gameManager.targetStrip[i][j];
      }
    }
  }

  addCloseButton() {
    const closeButtonBackground = this.scene.add.dom(
      816.5,
      195,
      "div",
      "width : 55px; height : 55px;" +
        "cursor : pointer; border:4px solid rgb(249, 211, 184); border-radius : 300px;  background-color: rgb(129, 56, 4)"
    );

    const closeButtonLine_1 = this.scene.add
      .dom(
        820,
        198,
        "div",
        "cursor : pointer; width: 57px; height : 4px; background-color: rgb(249, 211, 184);"
      )
      .setRotation(40);

    const closeButtonLine_2 = this.scene.add
      .dom(
        820,
        198,
        "div",
        "cursor : pointer; width: 57px; height : 4px; background-color: rgb(249, 211, 184);"
      )
      .setRotation(-40);

    this.closeButtonItems.push(
      closeButtonBackground,
      closeButtonLine_1,
      closeButtonLine_2
    );

    this.closeButtonItems.forEach((item) => {
      item.node.addEventListener("click", () => {
        this.setVisible(false);

        this.scene.uiInterface.optionsButton.setVisible(true);
        this.scene.uiInterface.enableInterface();
      });
    });
  }

  setVisible(isVisible: boolean) {
    if (isVisible) {
      this.inputs.forEach((columnInputs) => {
        columnInputs.forEach((input) => {
          input.setVisible(true);
        });
      });

      this.closeButtonItems.forEach((item) => {
        item.setVisible(true);
      });

      this.background.setVisible(true);
      this.title.setVisible(true);
    } else {
      this.inputs.forEach((columnInputs) => {
        columnInputs.forEach((input) => {
          input.setVisible(false);
        });
      });

      this.closeButtonItems.forEach((item) => {
        item.setVisible(false);
      });

      this.background.setVisible(false);
      this.title.setVisible(false);
    }
  }

  addInputs() {
    let posX = 410;
    let posY = 260;

    const padding = 80;
    for (let i = 0; i < this.scene.gameManager.targetStrip.length; i++) {
      for (let j = 0; j < 3; j++) {
        const input = this.scene.add
          .dom(
            posX,
            posY,
            "input",
            "position: absolute; width:40px; height : 40px; text-align: center; font-size:28px;"
          )
          .setInteractive();
        input.setOrigin(0);
        //@ts-ignore
        input.node.value = this.scene.gameManager.targetStrip[i][j];
        input.node.addEventListener("change", (event) => {
          //@ts-ignore
          let value = event.target.value;
          if (value > 9) {
            //@ts-ignore
            input.node.value = 10;
            value = 10;
          }
          if (value === "") {
            value = 0;
            //@ts-ignore
            input.node.value = 0;
          }
          this.scene.gameManager.targetStrip[i][j] = value;
        });
        posY += padding;

        this.inputs[i][j] = input;
      }
      posY = 260;
      posX += padding;
    }
  }

  addBackground() {
    this.background = this.scene.add.dom(
      this.x,
      this.y,
      "div",
      " width : 1200px; height : 800px; background-color: rgb(0, 6, 2);" +
        " margin-left:auto; margin-right:auto; left:0; right:0; margin-top : auto; margin-bottom: auto; top: 0; bottom :0; z-index: -1;"
    );
    this.background.setOrigin(0);
    this.background.setAlpha(0.9);
  }

  addTitle() {
    this.title = this.scene.add.dom(
      this.x,
      this.y,
      "h2",
      "text-align:center; width:1200px; margin-top:200px; color : rgb(235, 136, 31); font-family: 'Bebas Neue', sans-serif;" +
        " letter-spacing: 1px; ",
      "Choose the Next strip"
    );

    this.title.setOrigin(0);
  }
}
