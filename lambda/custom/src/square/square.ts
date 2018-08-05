export enum Direction {
	NORTH,
	SOUTH,
	EAST,
	WEST,
}

export enum Type {
	FOREST,
	PLAIN,
}

export enum SquareParticularity {
	GLADE,
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

export const DirectionsPattern: { [id: string]: string } = {
	[`${Type.FOREST}-${Type.FOREST}`]: "dans la forêt",
	[`${Type.FOREST}-${Type.PLAIN}`]: "en dehors de la forêt",
	[`${Type.PLAIN}-${Type.PLAIN}`]: "dans la plaine",
	[`${Type.PLAIN}-${Type.FOREST}`]: "qui entre dans la forêt",
};

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
		return `${this.getProgression(from)} ${this.preDescription(from)} ${this.getDescription(from)}`;
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

	public preDescription(from: Square): string {
		const neighbourhood = this.neighbourhood.filter((neighbour) => neighbour.square !== from);
		const typesDirections = new Array<{ type: Type, directions: Direction[] }>();
		neighbourhood.forEach((neighbour) => {
			const matching = typesDirections.find((typeDirections) => typeDirections.type === neighbour.square.type);
			if (matching !== undefined) {
				matching.directions.push(neighbour.direction);
			} else {
				typesDirections.push({
					directions: [neighbour.direction],
					type: neighbour.square.type,
				});
			}
		});

		const texts = new Array<string>();
		typesDirections.forEach((typeDirections) => {
			let text = "";
			switch (typeDirections.type) {
				case Type.PLAIN: {
					text = typeDirections.type === this.type ? "La" : "Une";
					text += " plaine";
					break;
				}
				case Type.FOREST: {
					text += typeDirections.type === this.type ? "La" : "Une";
					text += " forêt";
					break;
				}
				default: {
					break;
				}
			}

			if (typeDirections.type === this.type) {
				text += " s'étend ";
			} else {
				text += " est visible ";
			}

			if (typeDirections.directions.length === 3) {
				text += "dans toutes les directions";
			} else {
				text += typeDirections.directions.map((direction) => DirectionToString[direction].formA).join(" et ");
			}

			texts.push(`${text}.`);
		});

		return texts.join(" ");
	}

	public getDescription(from: Square): string {
		let text = "";

		const directionFrom = this.getDirectionToSquare(from);
		if (this.roadsTo.includes(directionFrom)) {
			switch (this.roadsTo.length) {
				case 1: {
					text += "Ici la route se termine.";
					break;
				}
				case 2: {
					const oppositeDirection = Square.getOppositeDirection(directionFrom);
					if (this.roadsTo.includes(oppositeDirection)) {
						text += `La route continue ${DirectionToString[oppositeDirection].formA}.`;
					} else {
						const directionTo = this.roadsTo.filter((each) => each !== directionFrom)[0];
						text += `Ici la route bifurque ${DirectionToString[directionTo].formA}.`;
					}
					break;
				}
				case 3: {
					text += "Ici la route se sépare en deux.";
					break;
				}
				case 4: {
					text += "Ici la route se sépare en trois.";
					break;
				}
			}
		} else {
			const hasRoads = this.hasRoads;
			if (hasRoads) {
				switch (this.roadsTo.length) {
					case 1: {
						text += `Ici une route commence et mène ${DirectionToString[this.roadsTo[0]].formA}.`;
						break;
					}
					case 2: {
						text += "Ici il y a une route qui joint ";
						text += `${DirectionToString[this.roadsTo[0]].formB} ${DirectionToString[this.roadsTo[1]].formA}.`;
						break;
					}
					case 3: {
						text += "Ici il y a un croisement.";
						break;
					}
					default: {
						// should not happen
						break;
					}
				}
			} else {
				text += "Il n'y a rien de spécial ici.";
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
