import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
 
/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

const Board = ({ rows = 5, cols = 5, startChance = 0.25 }) => {
  const createBoard = () => {
    return Array.from({ length: rows }).map(() =>
      Array.from({ length: cols }).map(
        () => Math.random() < startChance
      )
    );
  };
 
  const [board, setBoard] = useState(createBoard);
 
  const hasWon = () => {
    return board.every(row => row.every(cell => !cell));
  };
 
  const flipCellsAround = (coord) => {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
 
      const flipCell = (r, c, boardCopy) => {
        if (c >= 0 && c < cols && r >= 0 && r < rows) {
          boardCopy[r][c] = !boardCopy[r][c];
        }
      };
 
      const boardCopy = oldBoard.map(row => [...row]);
 
      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);
 
      return boardCopy;
    });
  };
 
  if (hasWon()) {
    return <div>You Win!</div>;
  }
 
  const tblBoard = [];
  for (let y = 0; y < rows; y++) {
    const row = [];
    for (let x = 0; x < cols; x++) {
      const coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />
      );
    }
    tblBoard.push(<tr key={y}>{row}</tr>);
  }
 
  return (
    <table className="Board">
      <tbody>{tblBoard}</tbody>
    </table>
  );
};
 
export default Board;
 