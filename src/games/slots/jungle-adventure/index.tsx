import { useEffect, useRef } from "react";
import Phaser from "phaser";
import "../../helper/WebFontLoader";

import style from "./index.module.css";
import { Preload } from "./scenes/preload";
import { Main } from "./scenes/main";

const JunkgleAdventure = () => {
  const canvasContainer = useRef(null);

  useEffect(() => {
    if (!canvasContainer.current) return;

    const hideWidth = window.outerWidth - window.innerWidth;
    const hideHeight = window.outerHeight - window.innerHeight;

    const game = new Phaser.Game({
      dom: { createContainer: true },
      physics: {
        default: "arcade",
      },
      parent: canvasContainer.current,
      fullscreenTarget: canvasContainer.current,
      type: Phaser.WEBGL,
      scale: {
        // mode: Phaser.Scale.FIT,
        mode: Phaser.Scale.NONE,
        // mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.outerWidth - hideWidth,
        height: window.outerHeight - hideHeight,
      },
      backgroundColor: 0x111112,
      scene: [Preload, Main],
    });

    return () => game.destroy(true, false);
  }, []);

  return <div ref={canvasContainer} className={style.canvasContainer}></div>;
};

export default JunkgleAdventure;
