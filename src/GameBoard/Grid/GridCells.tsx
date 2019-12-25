import React from 'react';
import EmptyGridCell from "./GridCell/EmptyGridCell";
import BadFood from './GridCell/BadFood';
import SnakeBody from './GridCell/SnakeBody';
import Crown from './GridCell/Crown';
import Food from './GridCell/Food';
import SnakeHead from './GridCell/SnakeHead';
import Position from '../../Models/Position';
import { Direction } from '../../Models/Direction';

interface GridCellsProps {
    count: number;
    headPosition: Position | undefined;
    foodPosition: Position | undefined;
    crownPosition: Position | undefined;
    tailPositions: Position[];
    badFoodPositions: Position[];
    direction: Direction;
    kingMode: boolean;
}


function GridCells(props: GridCellsProps) {
    const { count, headPosition, foodPosition, crownPosition, tailPositions, badFoodPositions, direction, kingMode } = props;
    function getCell(x: number, y: number) {
        const key = x.toString() + '-' + y.toString();
        const width = 500 / count;
        const props = {key, width, count, x, y, direction, kingMode};
        if (headPosition?.isEqual(x, y)) {
            return <SnakeHead {...props}  />;
        }

        if (foodPosition?.isEqual(x, y)) {
            return <Food {...props} />
        }

        if (crownPosition?.isEqual(x, y)) {
            return <Crown {...props} />
        }

        if (tailPositions.some(z => z.isEqual(x, y))) {
            return <SnakeBody {...props} />;
        }

        if (badFoodPositions.some(z => z.isEqual(x, y))) {
            return <BadFood {...props} />
        }

        return <EmptyGridCell {...props} />
    }
    const gridCells = [];
    for (let i = count - 1; i > -1; i--) {
        for (let j = 0; j < count; j++) {
            gridCells.push(getCell(j, i))
        } 
    }

    return <>{gridCells}</>;
}

export default GridCells;