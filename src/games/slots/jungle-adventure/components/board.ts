import { getRandomFloat } from "../../../../helper/tatukaMath";
import { symbolsData } from "../data/symbolsData";
import { Symbol } from "./symbol";

export class Board {
  nextSymbols: Array<Symbol> = [];
  currentColumns = [];

  constructor(public scene: Phaser.Scene, public x: number, public y: number) {
    this.init();
  }

  init() {

  }

  createColumns(numberOfColumn:number,paddingX:number){
    const column = []
    for (let symbolIndex = 0; symbolIndex < numberOfColumn; symbolIndex++) {
  
        
    }


    for (let i = 0; i < Object.keys(symbolsData).length; i++) {
      for (let j = 0; j < 3; j++) {
  
        
      }
      
    }
    //this.currentColumns.push(new Symbol(this.scene,100,100,symbolsData.ananas.key))
  }
}
