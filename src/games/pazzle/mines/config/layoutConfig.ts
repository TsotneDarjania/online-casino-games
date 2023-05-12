export const layoutConfig = {
  desktop: {
    canvas: {
      width: 900,
      height: 600,
    },
    minesButton: {
      width: 150,
      height: 27,
      y: 40,
      fontSize: 13,
    },
    indicatorBar: {
      background: {
        y: 100,
        height: 14,
      },
    },
    fill: {
      y: 100,
      height: 14,
    },
    board: {
      padding: 70,
      symbol: {
        legnth: 70,
      },
    },
    totalBalanceText: {
      x: -230,
      y: 20,
      fontSize: 20,
    },
    nextText: {
      x: -230,
      y: 50,
      fontSize: 16,
    },
  },
  mobile: {
    canvas: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    minesButton: {
      width: 150,
      height: 27,
      y: 40,
      fontSize: 13,
    },
    indicatorBar: {
      background: {
        y: 100,
        height: 14,
      },
    },
    fill: {
      y: 100,
      height: 14,
    },
    board: {
      padding: 60,
      symbol: {
        legnth: 60,
      },
    },
    totalBalanceText: {
      x: -330,
      y: 120,
      fontSize: 18,
    },
    nextText: {
      x: -330,
      y: 150,
      fontSize: 15,
    },
  },
};

export const screenSize = () => {
  if (window.innerWidth > 850) return layoutConfig.desktop;
  return layoutConfig.mobile;
};
