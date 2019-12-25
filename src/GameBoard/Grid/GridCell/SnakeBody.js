import GridCell from "./GridCell";
import React from 'react';

function SnakeBody(props) {
    const foodProps = Object.assign({}, {...props}, {isSnakeBody: true})
    return <GridCell {...foodProps} />
}

export default SnakeBody;