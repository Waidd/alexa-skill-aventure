import {
	Room,
	RoomType,
} from "../rooms";

import texts from "../fr-FR.json";

export class World {
	public static createWorld(): World {
		return new World();
	}

	private rooms: Room[] = new Array<Room>();

	public constructor() {
		this.rooms.push(new Room(RoomType.FOREST_EDGE, texts.RoomsDescription.ForestEdge));
		this.rooms.push(new Room(RoomType.FOREST_CROSSING, texts.RoomsDescription.ForestCrossing));
		this.rooms.push(new Room(RoomType.FOREST_GLADE, texts.RoomsDescription.ForestGlade));

		this.rooms[0].setDirection(
			1,
			"sentier",
			"vous engager sur le petit sentier qui s'enfonce dans la forêt",
			"retourner sur le sentier qui s'enfonce dans la forêt",
		);
		this.rooms[1].setDirection(
			0,
			"lisière",
			"vous diriger vers la lisière de la forêt",
			"retourner vers la lisière de la forêt",
		);
		this.rooms[1].setDirection(
			2,
			"sentier",
			"suivre le chemin qui s'enfonce dans la forêt",
			"retourner sur le chemin qui s'enfonce dans la forêt",
		);
		this.rooms[2].setDirection(
			1,
			"sentier",
			"suivre le sentier qui s'enfonce dans la forêt",
			"retourner sur le sentier qui s'enfonce dans la forêt",
		);
	}

	public getRoomDescription(roomID: number): string {
		const room = this.rooms[roomID];
		return room.getDescription();
	}

	public getRoomDirections(roomID: number, fromRoomID: number): string {
		const room = this.rooms[roomID];
		return room.getDirections(fromRoomID);
	}

	public getRoomByID(roomID: number): Room {
		return this.rooms[roomID];
	}
}
