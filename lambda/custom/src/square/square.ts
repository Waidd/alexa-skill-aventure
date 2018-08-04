export enum SquareDirection {
    NORTH,
    SOUTH,
    EAST,
    WEST,
}

export enum SquareType {
    FOREST,
    PLAIN,
}

export enum SquareParticularity {
    GLADE,
}

export class Square {
    public type: SquareType;
    public particulariy: SquareParticularity;
    public roadsTo: SquareDirection[] = new Array<SquareDirection>();
    
    public constructor(
        type: SquareType,
        particulariy: SquareParticularity,
        roadsTo: SquareDirection[],
    ) {
        this.type = type;
        this.particulariy = particulariy;
        this.roadsTo.add(...roadsTo);
    }
    
    public get directions(from: Square) {
        // from sentence
        // type of from
        // type of here
        // is there road ?
    }
}

// from sentence
// Vous suivez le chemin qui s'enfonce dans la forêt,
// Vous suivez le chemin dans la forêt,
// Vous suivez le chemin qui sort de la forêt,

// Alors que vous avancer tant bien que mal au travers de la forêt, vous arrivez sur un chemin
// Vous vous enfoncez dans la forêt, et arrivez à avancer au travers la végétation dense.

// Alors que vous suivez le chemin dans la forêt, celui-ci bifurque vers l'est.
// Vous pouvez continuer de le suivre, ou retourner sur vos pas, au sud.
// Vous pouvez également tenter votre chance en quittant le chemin et en 
// vous engageant dans la forêt : au nord ou à l'ouest.