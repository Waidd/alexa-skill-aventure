import texts from "../fr-FR.json";

export enum RoomType {
	FOREST_EDGE,
	FOREST_CROSSING,
	FOREST_GLADE,
}

export interface IDirection {
	direction: string;
	description: string;
	roomID: number;
}

export abstract class ARoom {
	public roomType: RoomType;
	public roomNodes: IDirection[] = new Array<IDirection>();

	public constructor(roomType: RoomType) {
		this.roomType = roomType;
	}

	public abstract getDescription(): string;

	public getDirections(): string {
		let description = texts.Direction;

		if (this.roomNodes.length > 1) {
			description += this.roomNodes.slice(0, -1).map((node) => node.description).join(", ");
			description += ` ou ${this.roomNodes[this.roomNodes.length - 1].description}`;
		} else {
			description += ` ${this.roomNodes[0].description}`;
		}
		return description;
	}

	public setDirection(roomID: number, direction: string, description: string): void {
		this.roomNodes.push({
			description,
			direction,
			roomID,
		});
	}

	public resolveDirection(direction: string): number {
		const selectedNode = this.roomNodes.find((node) => node.direction === direction);

		return selectedNode && selectedNode.roomID || -1;
	}
}
