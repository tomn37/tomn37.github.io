
import React from 'react';
import GridCell from "./GridCell";

function EmptyGridCell(props) {
    const foodProps = Object.assign({}, {...props}, {isFood: false, isSnakeBody: false, isSnakeHead: false})
    return <GridCell {...foodProps} />
}

export default React.memo(EmptyGridCell);