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

	public getDirections(fromRoomID: number): string {
		const directions = new Array<string>();
		this.roomNodes.forEach((node) => {
			if (node.roomID === fromRoomID) {
				directions.push(node.descriptionReturn);
			} else {
				directions.unshift(node.description);
			}
		});

		if (directions.length > 1) {
			return `${texts.Direction} : ${directions.slice(0, -1).join(", ")}, ou retourner en arrière, ${directions[directions.length - 1]}`;
		} else {
			return `${texts.Direction} : ${directions[0]}`;
		}
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
