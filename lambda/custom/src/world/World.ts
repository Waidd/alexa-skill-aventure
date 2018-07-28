import {
	ARoom,
	ForestCrossing,
	ForestEdge,
	ForestGlade,
} from "../rooms";

export class World {
	public static createWorld(): World {
		return new World();
	}

	private rooms: ARoom[] = new Array<ARoom>();

	public constructor() {
		this.rooms.push(new ForestEdge());
		this.rooms.push(new ForestCrossing());
		this.rooms.push(new ForestGlade());

		this.rooms[0].setDirection(1, "Vous pouvez aller tout droit, et vous engager sur un petit sentier.");
		this.rooms[1].setDirection(0, "Vous pouvez retourner en arrière, vers la lisière de la forêt.");
		this.rooms[1].setDirection(2, "Vous pouvez continuer tout droit en suivant le chemin.");
		this.rooms[2].setDirection(1, "Vous pouvez retourner en arrière par le sentier que vous avez emprunter");
	}

	public getRoomDescription(roomID: number): string {
		const room = this.rooms[roomID];
		return room.getDescription();
	}

	public getRoomDirections(roomID: number): string {
		const room = this.rooms[roomID];
		return room.getDirections();
	}
}
