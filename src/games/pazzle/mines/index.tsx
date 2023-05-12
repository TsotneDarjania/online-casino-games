import { useEffect, useRef } from "react";
import Phaser from "phaser";
import "../../helper/WebFontLoader";

import style from "./index.module.css";
import { Preload } from "./scenes/preload";
import { Main } from "./scenes/main";
import { screenSize } from "./config/layoutConfig";

const Mines = () => {
  const canvasContainer = useRef(null);
  useEffect(() => {
    if (!canvasContainer.current) return;

    const game = new Phaser.Game({
      dom: { createContainer: true },
      physics: {
        default: "arcade",
      },
      parent: canvasContainer.current,
      type: Phaser.AUTO,
      scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: screenSize().canvas.width,
        height: screenSize().canvas.height,
      },
      backgroundColor: 0x372652,
      scene: [Preload, Main],
    });

    return () => game.destroy(true, false);
  }, []);

  return <div ref={canvasContainer} className={style.canvasContainer}></div>;
};

export default Mines;
