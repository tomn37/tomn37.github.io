
import React from 'react';
import GridCell from "./GridCell";

 function Food(props) {
    const foodProps = Object.assign({}, {...props}, {isFood: true})
    return <GridCell {...foodProps} />
}

export default React.memo(Food);