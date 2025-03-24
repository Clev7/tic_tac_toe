import { BoardState, IBoard } from "@/types";
import { Square } from "./Square";

export function Board({ board, turn, onMove }: IBoard) {

	function checkWin(board: BoardState) {
		function areEqual(...args: string[]) {
			
			// Underscores don't count :p
			if (args[0] === "_") return false;

			for (let i = 1; i < args.length; i++) {
				if (args[i] !== args[0]) return false;
			}

			return true;
		}

		console.log("New check!");

		for (let r = 0; r < 3; r++) {
			if (areEqual(board[r][0], board[r][1], board[r][2])) {
				return board[r][0];
			}
		} 

		for (let c = 0; c < 3; c++) {
			if (areEqual(board[c][0], board[c][1], board[c][2])) {
				return board[c][0]
			}
		}

		if (areEqual(board[0][0], board[1][1], board[2][2])) {
			return board[0][0];
		}

		if (areEqual(board[2][0], board[1][1], board[0][2])) {
			return board[2][0];
		}

		return "Tie";
	}

	function makeMove(row: number, col: number) {
		const potentialWinner = checkWin(board);

		if (potentialWinner !== "Tie") {
			console.log("We already have a winner!");
			return;
		}

		if (board[row][col] !== "_") {
			return;
		}

		let newBoard = board.slice();

		newBoard[row] = newBoard[row].substring(0, col) + turn + newBoard[row].substring(col + 1);

		onMove(newBoard);
	}

	let res = [];

	for (let r = 0; r < 3; r++) {
		let row = [];
		for (let c = 0; c < 3; c++) {
			let props = {
				value: board[r][c],
				onSquareClick: () => makeMove(r, c)
			};

			row.push(<Square key={`${r}-${c}`} {...props} />);
		}

		res.push(<div key={r} className="board-row">{row}</div>);
	}

	let status = checkWin(board);
	console.log("winner: " + status);

	if (status === "Tie") {
		let hasEmpty = false;
		for (let r = 0; r < 3; r++) {
			for (let c = 0; c < 3; c++) {
				if (board[r][c] === "_") {
					hasEmpty = true;
					break;
				}
			}

			if (hasEmpty) break;
		}

		status = hasEmpty ? `Turn: ${turn}` : "Tie!";
	} else {
		status += " has won the game!";
	}

	return (
		<>
			<div className="status">{status}</div>
			{res}
		</>
	);
}