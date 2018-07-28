import texts from "../fr-FR.json";
import { ARoom, RoomType } from "./ARoom";

export class ForestCrossing extends ARoom {
	public constructor() {
		super(RoomType.FOREST_CROSSING);
	}

	public getDescription(): string {
		return texts.RoomsDescription.ForestCrossing;
	}
}
