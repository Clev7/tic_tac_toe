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

  const latest_board = boards[boards.length - 1];

  function handleMove(newBoard: BoardState) {
    setBoards([...boards, newBoard]);
    setTurn(turn === "X" ? "O" : "X");
  }

  return (
    <>
      <div className="board">
        <Board board={latest_board} turn={turn} onMove={handleMove}/>
      </div>
      <div>
        <ol>
          {boards.map((elem, idx) => {

            return (
              <li key={idx}>
                <button onClick={() => goToMove(idx)}>Go to move #{idx + 1}</button>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
