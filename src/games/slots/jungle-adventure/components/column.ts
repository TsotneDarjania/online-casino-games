import { getRandomFloat } from "../../../../helper/tatukaMath";
import { symbolsData } from "../data/symbolsData";
import { Symbol } from "./symbol"

export class Column extends Phaser.GameObjects.Container{
    paddingY : number = 50 
    constructor(public scene: Phaser.Scene,x:number,y:number){
        super(scene,x,y)
        this.scene.add.existing(this)
        this.init()
    }
    init() {
        this.createAllSymbols()
    }

    createSymbol(positionY:number,imageKey:string){
        const symbol = new Symbol(this.scene,0,positionY,imageKey);
        this.add(symbol);
    }

    createAllSymbols(){
        let positionY = 0;
        for (let index = 0; index < 3; index++) {
            this.createSymbol(positionY,this.getRandomImageKey())     
            positionY += this.paddingY;      
        }
    }

    getRandomImageKey(){
        return Object.values(symbolsData)[
            Math.floor(getRandomFloat(0, Object.keys(symbolsData).length - 1))
          ].key;
    }

}