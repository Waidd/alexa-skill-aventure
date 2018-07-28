import texts from "../fr-FR.json";

export enum RoomType {
	FOREST_EDGE,
	FOREST_CROSSING,
	FOREST_GLADE,
}

export interface IDirection {
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
		return [texts.Direction, ...this.roomNodes.map((node) => node.description)].join(" ");
	}

	public setDirection(roomID: number, description: string): void {
		this.roomNodes.push({
			description,
			roomID,
		});
	}
}
