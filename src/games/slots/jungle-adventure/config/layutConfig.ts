export const layoutConfig = {
  desktop: {
    canvas: {
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    },
    frame: {
      widthPercent: 70,
      heihtPercent: 90,
      y: 50,
    },
    interface: {
      background: {
        height: 120,
      },
      spinButton: {
        scale: 0.8,
      },
      increaseButton: {
        x: 300,
        scale: 0.7,
      },
      decreaseButton: {
        x: 100,
        scale: 0.7,
      },
      betText: {
        fontSize: "30px",
        x: 200,
      },
      optionsButton: {
        width: 70,
        heiht: 70,
      },
      optionsModal: {
        input: {
          width: "40px",
          height: "40px",
          fontSize: "28px",
          padding: 80,
        },
      },
    },
    board: {
      currentTween: {
        y: 400,
      },
      nextColumnPositionY: -400,
    },
  },
  mobile: {
    canvas: {
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    },
    frame: {
      widthPercent: 90,
      heihtPercent: 119,
      y: -30,
    },
    interface: {
      background: {
        height: 65,
      },
      spinButton: {
        scale: 0.6,
      },
      increaseButton: {
        x: 200,
        scale: 0.5,
      },
      decreaseButton: {
        x: 50,
        scale: 0.5,
      },
      betText: {
        fontSize: "26px",
        x: 125,
      },
      optionsButton: {
        width: 50,
        heiht: 50,
      },
      optionsModal: {
        input: {
          width: "40px",
          height: "40px",
          fontSize: "28px",
          padding: 80,
        },
      },
    },
    board: {
      currentTween: {
        y: 240,
      },
      nextColumnPositionY: -240,
    },
  },
};

export const screenSize = () => {
  if (document.body.clientWidth > 950) return layoutConfig.desktop;
  return layoutConfig.mobile;
};
