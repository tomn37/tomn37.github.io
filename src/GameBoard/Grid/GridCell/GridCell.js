import React from 'react';
import shanali from '../../../Assets/shanali_2.jpg';
import crown from '../../../Assets/crown.png';
import tom from '../../../Assets/tom.jpg';
import { Direction } from '../../../Models/Direction';

function GridCell(props) {
    const { x, y, width, count, isFood, isSnakeHead, isSnakeBody, direction, isBadFood, isCrown, kingMode } = props;
    const classes = [];
    if (y === count - 1) {
        classes.push("top")
    }

    if (y === 0) {
        classes.push("bottom");
    }

    if (x === 0) {
        classes.push("left")
    }

    if (x === count - 1) {
        classes.push("right")
    }

    if (isFood) {
        classes.push("food")
    }

    if (isSnakeBody) {
        classes.push("snakebody")
    }

    if (isSnakeHead) {
        classes.push("snakehead")
    }

    const transform = {
        [Direction.N]: "rotate(0deg)",
        [Direction.E]: "rotate(90deg)",
        [Direction.S]: "rotate(180deg)",
        [Direction.W]: "rotate(270deg)"
    }

    return <div className={classes.join(' ') + " grid-cell"} style={{width: width, height: width }}>
        {(isSnakeHead || isSnakeBody) && <img alt="snakehead" src={kingMode ? crown : shanali} style={{width: "100%", transform: transform[direction]}} />}
        {isFood && "🍕"}
        {/* {isSnakeBody && "🐍"} */}
        {isCrown && "👑"}
        {isBadFood && <img alt="snakehead" src={tom} style={{width: "100%", height: "100%"}} />}
    </div>
}

export default GridCell;