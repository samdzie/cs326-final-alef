import { CommentSection } from './comments';

export class Features {
    private _gender: string;
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

    get gender() {
        return this._gender;
    }

    set gender(gender: string) {
        switch (gender) {
            case "Neutral":
            case "Female":
            case "Male":
                this._gender = gender;
                break;
            default:
                throw new Error("gender must be 'Neutral', 'Female', or 'Male'");
        }
    }
}

export class Restroom {
    private _name: string;
    private _description: string;
    features: Features;
    comments: CommentSection;

    constructor(name: string) {
        this._name = name;
        this._description = "";
        this.features = new Features();
        this.comments = new CommentSection();
    }
}