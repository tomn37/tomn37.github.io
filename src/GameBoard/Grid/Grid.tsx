
import React, { useState } from 'react';
import EmptyGridCell from './GridCell/EmptyGridCell';
import SnakeBody from './GridCell/SnakeBody';
import SnakeHead from './GridCell/SnakeHead';

import { useEffect } from 'react';
import Board from '../../Models/Board';
import Position  from '../../Models/Position';
import Food from './GridCell/Food';


interface GridProps {
    board: Board;
}

export default function Grid(props: GridProps) {
    const { board } = props;
    const { boardSize: size } = board;
    const [headPosition, setHeadPosition] = useState<Position>();
    const [tailPositions, setTailPositions] = useState<Position[]>([]);
    const [foodPosition, setFoodPosition] = useState<Position>();
    const [isGameOver, setGameOver] = useState(false)
    useEffect(() => {
        const { snake } = board;
        setHeadPosition(snake.getHeadPosition());
        setTailPositions(snake.getBodyPositions());
        setFoodPosition(board.getFood());
    }, [board]);
    useEffect(() => {
        const { snake } = board;
        const intervalH = setInterval(() => {
            if (board.isGameOver()) return;
            snake.tick();
            const snakeHead = snake.getHeadPosition();
            const food = board.getFood();
            setHeadPosition(snakeHead);
            setTailPositions(snake.getBodyPositions());
            setGameOver(board.isGameOver());
            if (food.isPositionEqual(snakeHead)) {
                snake.increaseLength();
                setFoodPosition(board.getNewFood());
            }
        }, board.interval
        )

        return () => clearInterval(intervalH);
    }, [board])

    useEffect(() => {
        const { snake } = board;
        const fn = (ev: KeyboardEvent) => {
            snake.onKeyPress(ev.key);
        };
        document.addEventListener("keydown", fn);

        return () => document.removeEventListener("keydown", fn);
    }, [board])

    function getCell(x: number, y: number) {
        const key = x.toString() + '-' + y.toString();
        const width = 500 / size;
        const count = size;
        const props = {key, width, count, x, y};
        if (headPosition?.isEqual(x, y)) {
            return <SnakeHead {...props}  />;
        }

        if (foodPosition?.isEqual(x, y)) {
            return <Food {...props} />
        }

        if (tailPositions.some(z => z.isEqual(x, y))) {
            return <SnakeBody {...props} />;
        }

        return <EmptyGridCell {...props} />
    }
    const gridCells = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            gridCells.push(getCell(i, j))
        } 
    }

    return (
        isGameOver ? <h1 style={{color:'white'}}>Game Over!</h1> :
    <div className="grid" style={{width: 500 + (size * 2 + 2), height: 500 + (size * 2 + 2)}}>
        {gridCells}
    </div>);
}

