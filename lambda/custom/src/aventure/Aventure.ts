import { ARoom } from "../rooms/ARoom";

export class Aventure {
	public static createAventure(): Aventure {
		return new Aventure();
	}

	private rooms: ARoom[] = new Array<ARoom>();
	private currentRoom: ARoom = null;
}
