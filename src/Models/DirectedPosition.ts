import Position from "./Position";
import { Direction } from "./Direction";

export default class DirectedPosition extends Position {
    constructor(x:number, y: number, public direction: Direction) {
        super(x, y);
    }

    clone() {
        return new DirectedPosition(this.x, this.y, this.direction)
    }
}