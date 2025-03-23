import { ISquare } from "@/types"

// Interestingly, this component doesn't even need to have
// row and column information about it!
export function Square({ onSquareClick, value }: ISquare) {
	const val = value === "_" ? "" : value;

	return (
		<button className="square" onClick={onSquareClick}>{val}</button>
	)
}