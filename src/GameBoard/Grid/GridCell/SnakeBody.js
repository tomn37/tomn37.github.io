import GridCell from "./GridCell";
import React from 'react';

function SnakeBody(props) {
    const foodProps = Object.assign({}, {...props}, {isSnakeHead: true})
    return <GridCell {...foodProps} />
}

export default React.memo(SnakeBody);