import texts from "../fr-FR.json";
import { ARoom, RoomType } from "./ARoom";

export class ForestGlade extends ARoom {
	public constructor() {
		super(RoomType.FOREST_GLADE);
	}

	public getDescription(): string {
		return texts.RoomsDescription.ForestGlade;
	}
}
