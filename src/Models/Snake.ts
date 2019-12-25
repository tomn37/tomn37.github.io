import { Direction } from "./Direction";
import DirectedPosition from "./DirectedPosition";

export default class Snake {
    _size: number;
    _bodyPositions: DirectedPosition[] = [];
    _headPosition: DirectedPosition;
    _direction: Direction = Direction.E;
    _newdirection: Direction = Direction.E;
    _moveTail = true;
    _foodEaten = 0;
    _badFoodEaten = 0;
    constructor(snakeSize: number, gridSize: number) {
        this._size = snakeSize;
        const startY = Math.ceil(gridSize / 2);
        this._headPosition = new DirectedPosition(snakeSize, startY, this._direction);
        this.stack.push(this._direction);
        for (let i = 0; i < snakeSize; i++) {
            this._bodyPositions.push(new DirectedPosition(i, startY, this._direction))
            this.stack.push(this._direction);
        }
    }

    getHeadPosition() {
        return this._headPosition;
    }

    getNextHeadPositions() {
        const east = this._headPosition.clone();
        const west = this._headPosition.clone();
        const north = this._headPosition.clone();
        const south = this._headPosition.clone();
        east.x += 1;
        west.x -= 1;
        north.y += 1;
        south.x += 1;
        return [east, west, north, south];
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
        this.updateDirections();
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
        this._foodEaten++;
        this._moveTail = false;
    }

    eatBadFood() {
        this._badFoodEaten++;
    }
    stack: Direction[] = []

    private updateDirections() {
        this._headPosition.direction = this._direction;
        this.stack.unshift(this._direction);
        this.stack = this.stack.slice(0, this._size + this._foodEaten);
        const positions = this._bodyPositions.slice().reverse();
        for (let i = 0; i < positions.length; i++) {
            positions[i].direction = this.stack[i];
        }
    }
}
