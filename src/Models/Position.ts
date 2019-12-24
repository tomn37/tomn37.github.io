export default class Position {

    constructor(public x:number, public y: number) {}

    clone(): Position {
        return new Position(this.x, this.y);
    }

    isEqual(x: number, y: number): boolean {
        return this.x === x && this.y === y;
    }

    isPositionEqual(position: Position) {
        return this.y === position.y && this.x === position.x;
    }
}