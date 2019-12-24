import React from 'react';

function GridCell(props) {
    const { x, y, width, count, isFood, isSnakeHead, isSnakeBody } = props;
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

    return <div className={classes.join(' ') + " grid-cell"} style={{width: width, height: width }}>

    </div>
}

export default React.memo(GridCell)