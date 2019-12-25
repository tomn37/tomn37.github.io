import Board from "../../../Models/Board";
import React from 'react';
interface PowerModeProps {
    board: Board;
    timer: number;
}

function PowerMode(props: PowerModeProps) {
    const { board, timer } = props;

    return board.crownActive ? <h1 className="power-mode">Quick!!! Crown all the tomsos!!! {timer}s</h1> : null;
}

export default React.memo(PowerMode);