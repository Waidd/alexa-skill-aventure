import { Direction, Square, Type } from "./square";

function case1(): void {
	const x0y1 = new Square(0, 1, Type.FOREST);
	const x1y1 = new Square(1, 1, Type.FOREST);
	const x1y0 = new Square(1, 0, Type.FOREST);
	const x1y2 = new Square(1, 2, Type.FOREST);
	const x2y1 = new Square(2, 1, Type.PLAIN);

	x1y1.setNeighboorhood([
		{ direction: Direction.NORTH, square: x1y2 },
		{ direction: Direction.SOUTH, square: x1y0 },
		{ direction: Direction.WEST, square: x0y1 },
		{ direction: Direction.EAST, square: x2y1 },
	], [
		Direction.EAST,
		Direction.SOUTH,
	]);

	console.log(x1y1.getText(x1y0));
	console.log(x1y1.getText(x0y1));
	console.log(x1y1.getText(x1y2));
	console.log(x1y1.getText(x2y1));
}

case1();

// function case2(): string {
// 	const s1 = new Square(0, 0, Type.FOREST);
// 	const s2 = new Square(1, 0, Type.PLAIN);
// 	return s2.getText(s1);
// }

// function case3(): string {
// 	const s1 = new Square(0, 0, Type.FOREST);
// 	const s2 = new Square(1, 0, Type.PLAIN, undefined, [Direction.NORTH]);
// 	return s2.getText(s1);
// }

// function case4(): string {
// 	const s1 = new Square(0, 0, Type.FOREST);
// 	const s2 = new Square(1, 0, Type.PLAIN, undefined, [Direction.NORTH, Direction.SOUTH]);
// 	return s2.getText(s1);
// }

// function case5(): string {
// 	const s1 = new Square(0, 0, Type.FOREST);
// 	const s2 = new Square(1, 0, Type.PLAIN, undefined, [Direction.NORTH, Direction.SOUTH, Direction.WEST]);
// 	return s2.getText(s1);
// }

// function case6(): string {
// 	const s1 = new Square(0, 0, Type.FOREST);
// 	const s2 = new Square(1, 0, Type.PLAIN, undefined, [Direction.EAST, Direction.NORTH]);
// 	return s2.getText(s1);
// }

// console.log("case1:", case1());
// console.log("case2:", case2());
// console.log("case3:", case3());
// console.log("case4:", case4());
// console.log("case5:", case5());
// console.log("case6:", case6());
