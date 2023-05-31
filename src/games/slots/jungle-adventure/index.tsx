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

    console.log(document.body.scrollWidth);
    console.log(document.body.scrollHeight);

    const game = new Phaser.Game({
      dom: { createContainer: true },
      physics: {
        default: "arcade",
      },
      parent: canvasContainer.current,
      type: Phaser.WEBGL,
      scale: {
        mode: Phaser.Scale.NONE,

        // mode: Phaser.Scale.FIT,
        // autoCenter: Phaser.Scale.CENTER_BOTH,
        width: document.body.scrollWidth,
        height: document.body.scrollHeight,
      },
      backgroundColor: 0xc322e3,
      scene: [Preload, Main],
    });

    return () => game.destroy(true, false);
  }, []);

  return <div ref={canvasContainer} className={style.canvasContainer}></div>;
};

export default JunkgleAdventure;
