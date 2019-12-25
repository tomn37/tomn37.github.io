
import React, { useState } from 'react';

import EmptyGridCell from './GridCell/EmptyGridCell';
import SnakeBody from './GridCell/SnakeBody';
import SnakeHead from './GridCell/SnakeHead';

import { useEffect } from 'react';
import Board from '../../Models/Board';
import Position  from '../../Models/Position';
import Food from './GridCell/Food';
import BadFood from './GridCell/BadFood';
import Crown from './GridCell/Crown';
import { kingMessage } from '../../Models/Messages';
import CrownImg from '../../Assets/crown.png';

interface GridProps {
    board: Board;
    onRestart: () => void;
}

export default function Grid(props: GridProps) {
    const { board, onRestart } = props;
    const { boardSize: size } = board;
    const [headPosition, setHeadPosition] = useState<Position>();
    const [tailPositions, setTailPositions] = useState<Position[]>([]);
    const [foodPosition, setFoodPosition] = useState<Position>();
    const [crownPosition, setCrownPosition] = useState<Position>();
    const [badFoodPositions, setBadFoodPositions] = useState<Position[]>([]);
    const [isGameOver, setGameOver] = useState(false);
    const [timer, setTimer] = useState(15);
    const [fadedMessage, setFadedMesssage] = useState();
    useEffect(() => {
        const { snake } = board;
        setHeadPosition(snake.getHeadPosition());
        setTailPositions(snake.getBodyPositions());
        setFoodPosition(board.getFood());
        setBadFoodPositions([]);
        setCrownPosition(undefined);
        setFadedMesssage(undefined);
    }, [board]);
    useEffect(() => {  
        function sendMessage(message: string) {
            setFadedMesssage(message);
        }
        function crownMode() {
            setCrownPosition(undefined);
            board.setCrownActive();
            let crownTime = 15;
            let interval = setInterval(() => {
                crownTime--;
                setTimer(crownTime);
            }, 1000)
            setTimeout(() => {
                board.crownActive = false; 
                setTimer(15); 
                clearInterval(interval);
                setCrownPosition(board.getNewCrown());
            }, 15000);
        }

        const { snake } = board;
        let ticks = 0;
        let firstEat = true;
        const intervalH = setInterval(() => {
            ticks++;
            if (ticks === 1) {
                sendMessage("Collect 🍕 to make the Shanali 🐍 longer");
            }

            if (ticks === 30) {
                sendMessage("Collect 👑 to king the Tomsos.");
                setCrownPosition(board.getNewCrown());
            }        
            if (board.isGameOver()) return;
            snake.tick();
            const snakeHead = snake.getHeadPosition();
            const food = board.getFood();
            setHeadPosition(snakeHead);
            setTailPositions(snake.getBodyPositions());
            setGameOver(board.isGameOver());
            if (board.hasHitBadFood()){
                if (!board.crownActive) {
                    alert("no eating tomsos, mean one :(")
                } else {
                    sendMessage(kingMessage())
                    setCrownPosition(undefined);
                    board.eatBadFood(snakeHead);
                    setBadFoodPositions(board.getBadFoods());
                }
            }
            if (food.isPositionEqual(snakeHead)) {
                snake.increaseLength();
                if (firstEat) {firstEat = false; sendMessage("Don't eat the Tomsos!");}
                setFoodPosition(board.getNewFood());
                setBadFoodPositions(board.getNewBadFood());
            }
            const crown = board.getCrown();
            if (crown?.isPositionEqual(snakeHead)) {
                crownMode();
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
        const direction = board.snake.getDirection();
        const kingMode = board.crownActive;
        const props = {key, width, count, x, y, direction, kingMode};
        if (headPosition?.isEqual(x, y)) {
            return <SnakeHead {...props}  />;
        }

        if (foodPosition?.isEqual(x, y)) {
            return <Food {...props} />
        }

        if (crownPosition?.isEqual(x, y)) {
            return <Crown {...props} />
        }

        if (tailPositions.some(z => z.isEqual(x, y))) {
            return <SnakeBody {...props} />;
        }

        if (badFoodPositions.some(z => z.isEqual(x, y))) {
            return <BadFood {...props} />
        }

        return <EmptyGridCell {...props} />
    }
    const gridCells = [];
    for (let i = size - 1; i > -1; i--) {
        for (let j = 0; j < size; j++) {
            gridCells.push(getCell(j, i))
        } 
    }

    return (
        isGameOver ? <h1 onClick={onRestart} className="restart">Game Over! Restart?</h1> :
    <>
    <div className={`${board.crownActive ? "king " : ""} grid`} style={{width: 500 + (size * 2 + 2), height: 500 + (size * 2 + 2)}}>
        {gridCells}
        { <img className="img-1" alt="" src={CrownImg} />}
        { <img className="img-2" alt="" src={CrownImg} />}
    </div>
    {board.crownActive && <h1 className="power-mode">Quick!!! Crown all the tomsos!!! {timer}s</h1>};
    <h1 className="faded-message">{fadedMessage}</h1>
    </>)
}

