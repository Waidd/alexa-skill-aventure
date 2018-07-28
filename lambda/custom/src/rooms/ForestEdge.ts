import texts from "../fr-FR.json";
import { ARoom, RoomType } from "./ARoom";

export class ForestEdge extends ARoom {
	public constructor() {
		super(RoomType.FOREST_EDGE);
	}

	public getDescription(): string {
		return texts.RoomsDescription.ForestEdge;
	}
}
