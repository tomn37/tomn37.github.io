import Snake from "./Snake";
import Position from "./Position";

export default class Board {
    _food: Position;
    snake: Snake;
    constructor(public snakeSize: number, public boardSize: number, public interval: number) {
        this.snake = new Snake(snakeSize, boardSize);
        this._food = this.getNewFood();
    }

    isGameOver(): boolean {
        return this.isOutOfBounds() || this.hasHitSelf();
    }

    getFood() {
        return this._food;
    }

    getInterval() {
        return this.interval
    }

    decreaseInterval() {
        this.interval = this.interval / 2;
    }

    getNewFood() {
        const excludedPositions = [this.snake.getHeadPosition(), ...this.snake.getBodyPositions()];
        this._food = this.getFoodPosition(excludedPositions);

        return this.getFood();
    }

    private getFoodPosition(excludedPositions: Position[]): Position {

        const randX = Math.floor(Math.random() * this.boardSize);
        const randY = Math.floor(Math.random() * this.boardSize);
        const randomPosition = new Position(randX, randY);
        if (excludedPositions.some(p => p.isPositionEqual(randomPosition))) {
            return this.getFoodPosition(excludedPositions);
        }

        return randomPosition;
    }

    private isOutOfBounds(): boolean {
        const headPosition = this.snake.getHeadPosition();
        return headPosition.x >= this.boardSize || 
        headPosition.x <= -1 ||
        headPosition.y >= this.boardSize ||
        headPosition.y <= -1;
    }

    private hasHitSelf(): boolean {
        const bodyPositions = this.snake.getBodyPositions();
        const headPosition = this.snake.getHeadPosition();

        return bodyPositions.some(x => x.isPositionEqual(headPosition));
    }
}