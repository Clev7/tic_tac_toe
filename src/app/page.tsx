"use client";

import { Board } from "@/components/Board";
import { BoardState } from "@/types";
import { useState } from "react";

export default function Game() {
	const [boards, setBoards] = useState([[
		"___",
		"___",
		"___"
	]]);

	const [turn, setTurn] = useState("X");
  const [currentMove, setCurrentMove] = useState(0);

  function handleMove(newBoard: BoardState) {
    const updatedBoards = [...boards.slice(0, currentMove + 1), newBoard];
    setBoards(updatedBoards);
    setTurn(turn === "X" ? "O" : "X");
    setCurrentMove(updatedBoards.length - 1);
  }
  
  function goToMove(idx: number) {
    setCurrentMove(idx);
    setTurn(idx % 2 == 0 ? "X" : "O");
  }

  return (
    <>
      <div className="board">
        <Board board={boards[currentMove]} turn={turn} onMove={handleMove}/>
      </div>
      <div>
        <ol>
          {boards.map((elem, idx) => {

            return (
              <li key={idx}>
                <button onClick={() => goToMove(idx)}>Go to move #{idx}</button>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
