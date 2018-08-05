export enum Direction {
	NORTH,
	SOUTH,
	EAST,
	WEST,
}

export interface INeighboor {
	square: Square;
	direction: Direction;
}

export const DirectionToString: { [id: string]: { formA: string, formB: string} } = {
	[Direction.NORTH]: { formA: "au nord", formB: "le nord" },
	[Direction.SOUTH]: { formA: "au sud", formB: "le sud" },
	[Direction.EAST]: { formA: "à l'est", formB: "l'est" },
	[Direction.WEST]: { formA: "à l'ouest", formB: "l'ouest" },
};

export enum Type {
	FOREST,
	PLAIN,
}

export const DirectionsPattern: { [id: string]: string } = {
	[`${Type.FOREST}-${Type.FOREST}`]: "dans la forêt",
	[`${Type.FOREST}-${Type.PLAIN}`]: "en dehors de la forêt",
	[`${Type.PLAIN}-${Type.PLAIN}`]: "dans la plaine",
	[`${Type.PLAIN}-${Type.FOREST}`]: "au sein de la forêt",
};

export enum SquareParticularity {
	GLADE,
}

export class Square {
	public static getOppositeDirection(from: Direction): Direction {
		switch (from) {
			case Direction.NORTH: {
				return Direction.SOUTH;
			}
			case Direction.SOUTH: {
				return Direction.NORTH;
			}
			case Direction.EAST: {
				return Direction.WEST;
			}
			case Direction.WEST: {
				return Direction.EAST;
			}
		}
	}

	public x: number;
	public y: number;

	public type: Type;
	public particulariy: SquareParticularity;
	public neighbourhood: INeighboor[];
	public roadsTo: Direction[];

	public constructor(
		x: number,
		y: number,
		type: Type,
		particulariy: SquareParticularity = null,
	) {
		this.x = x;
		this.y = y;
		this.type = type;
		this.particulariy = particulariy;
	}

	public setNeighboorhood(
		neighbourhood: INeighboor[],
		roadsTo: Direction[] = [],
	): void {
		this.neighbourhood = neighbourhood;
		this.roadsTo = roadsTo;
	}

	public getText(from: Square): string {
		return `${this.getProgression(from)} ${this.getDescription(from)}`;
	}

	public getProgression(from: Square): string {
		let text = "";

		const directionFrom = this.getDirectionToSquare(from);
		if (this.roadsTo.includes(directionFrom)) {
			// come from a road
			// @TODO could replace "suivez" with variations of the word
			text += "Vous suivez le chemin";
		} else {
			// does not come from a road
			const toRoughTerrain = this.isRoughTerrain;
			const fromRoughTerrain = from.isRoughTerrain;

			if (fromRoughTerrain && toRoughTerrain) {
				text += "Vous progressez péniblement";
			} else if (!fromRoughTerrain && !toRoughTerrain) {
				text += "Vous progressez";
			} else {
				text += "Vous vous frayez un chemin";
			}
		}

		text += ` ${DirectionsPattern[`${from.type}-${this.type}`]}.`;

		return text;
	}

	public getDescription(from: Square): string {
		let text = "";

		const directionFrom = this.getDirectionToSquare(from);
		if (this.roadsTo.includes(directionFrom)) {
			switch (this.roadsTo.length) {
				case 1: {
					text += "La route se termine ici.";
					break;
				}
				case 2: {
					const oppositeDirection = Square.getOppositeDirection(directionFrom);
					if (this.roadsTo.includes(oppositeDirection)) {
						text += `La route continue ${DirectionToString[oppositeDirection].formA}.`;
					} else {
						const directionTo = this.roadsTo.filter((each) => each !== directionFrom)[0];
						text += `La route bifurque ${DirectionToString[directionTo].formA}.`;
					}
					break;
				}
				case 3: {
					text += "La route se sépare en deux.";
					break;
				}
				case 4: {
					text += "La route se sépare en trois.";
					break;
				}
			}
		} else {
			const hasRoads = this.hasRoads;
			if (hasRoads) {
				switch (this.roadsTo.length) {
					case 1: {
						text += `Ici, une route commence et mène ${DirectionToString[this.roadsTo[0]].formA}.`;
						break;
					}
					case 2: {
						text += "Vous tombez sur une route qui joint ";
						text += `${DirectionToString[this.roadsTo[0]].formB} ${DirectionToString[this.roadsTo[1]].formA}.`;
						break;
					}
					case 3: {
						text += "Vous tombez sur un croisement.";
						break;
					}
					default: {
						// should not happen
						break;
					}
				}
			} else {
				text += "Ici, il n'y a rien de spécial.";
			}
		}

		return text;
	}

	public get isRoughTerrain(): boolean {
		switch (this.type) {
			case Type.FOREST: {
				return true;
			}
			default: {
				return false;
			}
		}
	}

	public get hasRoads(): boolean {
		return this.roadsTo.length > 0;
	}

	private getDirectionToSquare(to: Square): Direction {
		const neighbour = this.neighbourhood.find((each) => each.square === to);
		return neighbour.direction;
	}
}

// from sentence
// Vous suivez le chemin qui s'enfonce dans la forêt,
// Vous suivez le chemin dans la forêt,
// Vous suivez le chemin qui sort de la forêt,

// Alors que vous avancer tant bien que mal au travers de la forêt, vous arrivez sur un chemin
// Vous vous enfoncez dans la forêt, et arrivez à avancer au travers la végétation dense.

// Alors que vous suivez le chemin dans la forêt, celui-ci bifurque vers l'est.
// Vous pouvez continuer de le suivre, ou retourner sur vos pas, au sud.
// Vous pouvez également tenter votre chance en quittant le chemin et en
// vous engageant dans la forêt : au nord ou à l'ouest.
