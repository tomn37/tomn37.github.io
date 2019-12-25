import Snake from "./Snake";
import Position from "./Position";

export default class Board {
    _food: Position;
    _crown: Position | undefined;
    _badFoods: Position[] = [];
    snake: Snake;
    counter = 0;
    crownActive = false;
    constructor(public snakeSize: number, public boardSize: number, public interval: number) {
        this.snake = new Snake(snakeSize, boardSize);
        this._food = this.getNewFood();
    }

    isGameOver(): boolean {
        return (this.isOutOfBounds() || this.hasHitSelf() || (this.hasHitBadFood() && !this.crownActive));
    }

    hasHitBadFood() {
        const headPosition = this.snake.getHeadPosition();
        return this._badFoods.some(x => x.isPositionEqual(headPosition));
    }

    getFood() {
        return this._food;
    }

    getInterval() {
        return this.interval
    }

    getNewFood() {
        this._food = this.getFoodPosition();

        return this.getFood();
    }

    getBadFoods() {
        return this._badFoods;
    }

    getNewBadFood() {

        this.counter++;
        for (let i = 0; i < this.counter; i++) {
            const food = this.getFoodPosition();
            this._badFoods.push(food);
        }

        return this.getBadFoods();
    }

    eatBadFood(position: Position) {
        this._badFoods = this._badFoods.filter(x => !x.isPositionEqual(position))
    }

    getCrown() {
        return this._crown;
    }

    setCrownActive() {
        this.crownActive = true;
    }

    getNewCrown() {
        const crown = this.getFoodPosition();
        this._crown = crown;
        return this.getCrown();
    }

    getFoodPosition() {
        const excludedPositions = [this.snake.getHeadPosition(), this._food, this._crown, ...this._badFoods, ...this.snake.getBodyPositions()];
        return this.getFoodPositionRecurse(excludedPositions);
    }

    private getFoodPositionRecurse(excludedPositions: (Position | undefined)[]): Position {

        const randX = Math.floor(Math.random() * this.boardSize);
        const randY = Math.floor(Math.random() * this.boardSize);
        const randomPosition = new Position(randX, randY);
        if (excludedPositions.some(p => p && p.isPositionEqual(randomPosition))) {
            return this.getFoodPositionRecurse(excludedPositions);
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