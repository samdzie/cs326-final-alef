import { CommentSection } from './comments';

export class Features {
    gender: string;
    accessible: boolean;
    lactation: boolean;
    changing: boolean;
    stall: boolean;
    towels: boolean;
    covers: boolean;
    sanitary: boolean;
    lock: boolean;

    constructor() {
        this.gender = "Neutral";
        this.accessible = false;
        this.lactation = false;
        this.changing = false;
        this.stall = false;
        this.towels = false;
        this.covers = false;
        this.sanitary = false;
        this.lock = false;
    }

    // get gender() {
    //     return this._gender;
    // }

    // set gender(gender: string) {
    //     switch (gender) {
    //         case "Neutral":
    //         case "Women":
    //         case "Men":
    //             this._gender = gender;
    //             break;
    //         default:
    //             throw new Error("gender must be 'Neutral', 'Women', or 'Men'");
    //     }
    // }
}

export class Restroom {
    id: number;
    name: string;
    building: string;
    description: string;
    features: Features;
    comments: CommentSection;

    constructor(id: number) {
        this.id = id;
        this.name = "";
        this.building = "";
        this.description = "";
        this.features = new Features();
        this.comments = new CommentSection();
    }

    // get id() {
    //     return this._id;
    // }

    // get name() {
    //     return this._name;
    // }

    // set name(name: string) {
    //     this._name = name;
    // }

    // get description() {
    //     return this._description;
    // }

    // set description(description: string) {
    //     this._description = description;
    // }
}