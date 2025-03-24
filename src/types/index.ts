export interface ISquare {
	value: string
	onSquareClick: () => void
}

export type BoardState = string[]

export interface IBoard {
	board: BoardState,
	turn: string,
	onMove: (board: BoardState) => void
}
