
import React from 'react';
import GridCell from "./GridCell";
import defaultGrid from './defaultGrid';

 function BadFood(props) {
    const foodProps = Object.assign({}, {...props}, {...defaultGrid}, {isBadFood: true})
    return <GridCell {...foodProps} />
}

export default React.memo(BadFood);