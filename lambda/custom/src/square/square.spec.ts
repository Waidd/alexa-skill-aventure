import { Direction, Square, Type } from "./square";

function case1(): string {
	const s1 = new Square(0, 0, Type.FOREST);
	const s2 = new Square(1, 0, Type.FOREST);
	return s2.getText(s1);
}

function case2(): string {
	const s1 = new Square(0, 0, Type.FOREST);
	const s2 = new Square(1, 0, Type.PLAIN);
	return s2.getText(s1);
}

function case3(): string {
	const s1 = new Square(0, 0, Type.FOREST);
	const s2 = new Square(1, 0, Type.PLAIN, undefined, [Direction.NORTH]);
	return s2.getText(s1);
}

function case4(): string {
	const s1 = new Square(0, 0, Type.FOREST);
	const s2 = new Square(1, 0, Type.PLAIN, undefined, [Direction.NORTH, Direction.SOUTH]);
	return s2.getText(s1);
}

function case5(): string {
	const s1 = new Square(0, 0, Type.FOREST);
	const s2 = new Square(1, 0, Type.PLAIN, undefined, [Direction.NORTH, Direction.SOUTH, Direction.WEST]);
	return s2.getText(s1);
}

function case6(): string {
	const s1 = new Square(0, 0, Type.FOREST);
	const s2 = new Square(1, 0, Type.PLAIN, undefined, [Direction.EAST, Direction.NORTH]);
	return s2.getText(s1);
}

console.log("case1:", case1());
console.log("case2:", case2());
console.log("case3:", case3());
console.log("case4:", case4());
console.log("case5:", case5());
console.log("case6:", case6());
