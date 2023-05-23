import { calculatePercentage } from "../../../../helper/tatukaMath";
import { screenSize } from "../config/layutConfig";
import { Main } from "../scenes/main";

export class OptionsModal {
  inputs: Array<Array<Phaser.GameObjects.DOMElement>> = [[], [], [], [], []];
  background!: Phaser.GameObjects.DOMElement;
  title!: Phaser.GameObjects.DOMElement;

  allInputsContainer!: Phaser.GameObjects.Container;

  width = 0;
  height = 0;

  closeButtonItems: Array<Phaser.GameObjects.DOMElement> = [];

  constructor(public scene: Main, public x: number, public y: number) {
    this.init();
  }

  init() {
    this.allInputsContainer = this.scene.add.container(0, 0);

    this.addBackground();
    this.addInputs();
    this.addTitle();

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
      this.scene.screenWidth - 50,
      40,
      "div",
      "width : 55px; height : 55px;" +
        "cursor : pointer; border-radius : 300px;"
    );

    const closeButtonLine_1 = this.scene.add
      .dom(
        this.scene.screenWidth - 50,
        40,
        "div",
        "cursor : pointer; width: 57px; height : 4px; background-color: rgb(249, 211, 184);"
      )
      .setRotation(40);

    const closeButtonLine_2 = this.scene.add
      .dom(
        this.scene.screenWidth - 50,
        40,
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
    let posX = 0;
    let posY = 0;

    const padding = screenSize().interface.optionsModal.input.padding;
    for (let i = 0; i < this.scene.gameManager.targetStrip.length; i++) {
      for (let j = 0; j < 3; j++) {
        const input = this.scene.add
          .dom(
            posX,
            posY,
            "input",
            `position: absolute; width:${
              screenSize().interface.optionsModal.input.width
            }; height : ${
              screenSize().interface.optionsModal.input.height
            }; text-align: center; font-size:${
              screenSize().interface.optionsModal.input.fontSize
            };`
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

        this.allInputsContainer.add(input);
      }
      posY = 0;
      posX += padding;
    }

    this.width =
      this.inputs[0][0].width * 5 + (padding - this.inputs[0][0].width) * 4;

    this.height =
      this.inputs[0][0].height * 3 + (padding - this.inputs[0][0].height) * 2;

    this.allInputsContainer.setPosition(
      this.scene.screenWidth / 2 - this.width / 2,
      this.scene.screenHeight / 2 - this.height / 2
    );
  }

  addBackground() {
    this.background = this.scene.add.dom(
      this.x,
      this.y,
      "div",
      " width : 100vw; height : 100vh; background-color: rgb(0, 6, 2);" +
        " margin-left:auto; margin-right:auto; left:0; right:0; margin-top : auto; margin-bottom: auto; top: 0; bottom :0; z-index: -1;"
    );
    this.background.setOrigin(0);
    this.background.setAlpha(0.9);
  }

  addTitle() {
    this.title = this.scene.add.dom(
      this.scene.screenWidth / 2,
      this.scene.screenHeight / 2 - calculatePercentage(90, this.height),
      "h2",
      "color : rgb(235, 136, 31); font-family: 'Bebas Neue', sans-serif;" +
        " letter-spacing: 1px; ",
      "Choose the Next strip"
    );

    this.title.setOrigin(0.5);
  }
}
