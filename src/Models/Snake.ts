import { Direction } from "./Direction";
import Position  from "./Position";

export default class Snake {
    _size: number;
    _bodyPositions: Position[] = [];
    _headPosition: Position;
    _direction: Direction = Direction.E;
    _newdirection: Direction = Direction.E;
    _moveTail = true;
    constructor(snakeSize: number, gridSize: number) {
        this._size = snakeSize;
        const startX = Math.ceil(gridSize / 2);
        this._headPosition = new Position(startX, snakeSize);
        for (let i = 0; i < snakeSize; i++) {
            this._bodyPositions.push(new Position(i, snakeSize))
        }
    }

    getHeadPosition() {
        return this._headPosition;
    }

    getBodyPositions() {
        return this._bodyPositions;
    }

    getDirection() {
        return this._direction;
    }

    move(direction: Direction) {
        this._newdirection = direction;
    }

    tick() {
        this._direction = this._newdirection;
        const indexToStart = this._moveTail ? 1 : 0;
        const newSnakePosition = this._bodyPositions.slice(indexToStart);
        this._bodyPositions = [...newSnakePosition, this._headPosition.clone()];
        switch(this._direction) {
            case Direction.E: this._headPosition.x +=1; break;
            case Direction.W: this._headPosition.x -=1; break;
            case Direction.N: this._headPosition.y +=1; break;
            case Direction.S: this._headPosition.y -=1; break;
        }
        this._moveTail = true;
    }

    onKeyPress(key: string) {
        switch(key) {
            case "ArrowDown": if(this._direction !== Direction.N) this._newdirection = Direction.S;
                break;
            case "ArrowUp": if(this._direction !== Direction.S) this._newdirection = Direction.N;
                break;
            case "ArrowLeft": if(this._direction !== Direction.E) this._newdirection = Direction.W;
                break;
            case "ArrowRight": if(this._direction !== Direction.W) this._newdirection = Direction.E;
                break;
        }
    }

    increaseLength() {
        this._moveTail = false;
    }
}
