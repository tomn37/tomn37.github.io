
import React, { useState, useEffect } from 'react';

import Board from '../../Models/Board';
import Position  from '../../Models/Position';
import { kingMessage } from '../../Models/Messages';
import PowerModeMessage from './Messages/PowerModeMessage';
import Message from './Messages/Message';
import KingBackground from './Background/KingBackground';
import GridCells from './GridCells';
import Score from './InfoBar/Score/Score';
import DirectedPosition from '../../Models/DirectedPosition';

interface GridProps {
    board: Board;
    onRestart: () => void;
}

export default function Grid(props: GridProps) {
    const { board, onRestart } = props;
    const { boardSize: size } = board;
    const [headPosition, setHeadPosition] = useState<DirectedPosition>();
    const [tailPositions, setTailPositions] = useState<DirectedPosition[]>([]);
    const [foodPosition, setFoodPosition] = useState<Position>();
    const [crownPosition, setCrownPosition] = useState<Position>();
    const [badFoodPositions, setBadFoodPositions] = useState<Position[]>([]);
    const [gameOverMessage, setGameOverMessage] = useState();
    const [timer, setTimer] = useState(15);
    const [message, setMessage] = useState();
    useEffect(() => {
        const { snake } = board;
        setHeadPosition(snake.getHeadPosition());
        setTailPositions(snake.getBodyPositions());
        setFoodPosition(board.getFood());
        setBadFoodPositions([]);
        setCrownPosition(undefined);
        setMessage(undefined);
        setGameOverMessage(undefined);
    }, [board]);
    useEffect(() => {  
        function sendMessage(message: string) {
            setMessage(message);
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
            if (board.getGameoverMessage()) return;
            snake.tick();
            const snakeHead = snake.getHeadPosition();
            const food = board.getFood();
            setHeadPosition(snakeHead);
            setTailPositions(snake.getBodyPositions());
            setGameOverMessage(board.getGameoverMessage());
            if (board.hasHitBadFood()){
                if (board.crownActive) {
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

    return (
        gameOverMessage ? <h1 onClick={onRestart} className="restart">{gameOverMessage} Click to restart!</h1> :
    <div className="container">
        <div className="grid-container">
            <div className={`${board.crownActive ? "king" : ""} grid`}>
                <KingBackground >
                    <GridCells 
                    count={size} 
                    badFoodPositions={badFoodPositions}
                    crownPosition={crownPosition}
                    foodPosition={foodPosition}
                    headPosition={headPosition}
                    tailPositions={tailPositions}
                    kingMode={board.crownActive} />
                </KingBackground>

            </div>
            <PowerModeMessage board={board} timer={timer} />
            <Message message={message} />
        </div>
            <Score score={board.getScore()} foodEaten={board.snake._foodEaten} badFoodEaten={board.snake._badFoodEaten} />
    </div>
)
}

