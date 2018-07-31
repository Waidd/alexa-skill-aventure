import { Room } from "../rooms/Room";

export class Aventure {
	public static createAventure(): Aventure {
		return new Aventure();
	}

	private rooms: Room[] = new Array<Room>();
	private currentRoom: Room = null;
}
