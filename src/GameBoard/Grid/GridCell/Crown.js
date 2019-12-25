
import React from 'react';
import GridCell from "./GridCell";
import defaultGrid from './defaultGrid';

 function Crown(props) {
    const foodProps = Object.assign({}, {...props}, {...defaultGrid}, {isCrown: true})
    return <GridCell {...foodProps} />
}

export default React.memo(Crown);