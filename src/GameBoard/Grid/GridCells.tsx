import React from 'react';
import EmptyGridCell from "./GridCell/EmptyGridCell";
import BadFood from './GridCell/BadFood';
import SnakeBody from './GridCell/SnakeBody';
import Crown from './GridCell/Crown';
import Food from './GridCell/Food';
import SnakeHead from './GridCell/SnakeHead';
import Position from '../../Models/Position';
import DirectedPosition from '../../Models/DirectedPosition';

interface GridCellsProps {
    count: number;
    headPosition: DirectedPosition | undefined;
    foodPosition: Position | undefined;
    crownPosition: Position | undefined;
    tailPositions: DirectedPosition[];
    badFoodPositions: Position[];
    kingMode: boolean;
}


function GridCells(props: GridCellsProps) {
    const { count, headPosition, foodPosition, crownPosition, tailPositions, badFoodPositions, kingMode } = props;
    function getCell(x: number, y: number) {
        const key = x.toString() + '-' + y.toString();
        const width = 500 / count;
        const props = {key, width, count, x, y, kingMode};
        if (headPosition?.isEqual(x, y)) {
            const newProps = Object.assign({}, props, {direction: headPosition?.direction})
            return <SnakeHead {...newProps}  />;
        }

        if (foodPosition?.isEqual(x, y)) {
            return <Food {...props} />
        }

        if (crownPosition?.isEqual(x, y)) {
            return <Crown {...props} />
        }

        if (tailPositions.some(z => z.isEqual(x, y))) {
            const position = tailPositions.find(z => z.isEqual(x, y));
            const newProps = Object.assign({}, props, {direction: position?.direction})
            return <SnakeBody {...newProps} />;
        }

        if (badFoodPositions.some(z => z.isEqual(x, y))) {
            return <BadFood {...props} />
        }

        return <EmptyGridCell {...props} />
    }
    const gridCells = [];
    for (let i = count - 1; i > -1; i--) {
        for (let j = 0; j < count; j++) {
            gridCells.push(getCell(j, i));
        } 
    }

    return <>{gridCells}</>;
}

export default GridCells;