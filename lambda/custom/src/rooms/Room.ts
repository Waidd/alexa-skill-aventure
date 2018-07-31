import texts from "../fr-FR.json";

export enum RoomType {
	FOREST_EDGE,
	FOREST_CROSSING,
	FOREST_GLADE,
	FOREST_RIVER,
	FOREST_CABIN,
}

export interface IDirection {
	direction: string;
	description: string;
	descriptionReturn: string;
	roomID: number;
}

export class Room {
	public roomType: RoomType;
	public roomNodes: IDirection[] = new Array<IDirection>();
	public description: string;

	public constructor(roomType: RoomType, description: string) {
		this.roomType = roomType;
		this.description = description;
	}

	public getDescription(): string {
		return this.description;
	}

	public getDirections(): string {
		let description = texts.Direction;

		if (this.roomNodes.length > 1) {
			description += ` ${this.roomNodes.slice(0, -1).map((node) => node.description).join(", ")}`;
			description += ` ou ${this.roomNodes[this.roomNodes.length - 1].description}`;
		} else {
			description += ` ${this.roomNodes[0].description}`;
		}
		return description;
	}

	public setDirection(roomID: number, direction: string, description: string, descriptionReturn: string): void {
		this.roomNodes.push({
			description,
			descriptionReturn,
			direction,
			roomID,
		});
	}

	public resolveDirection(direction: string): number {
		const selectedNode = this.roomNodes.find((node) => node.direction === direction);

		return selectedNode && selectedNode.roomID || -1;
	}
}
