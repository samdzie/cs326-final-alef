"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comments_1 = require("./comments");
class Features {
    constructor() {
        this._gender = "Neutral";
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
    set gender(gender) {
        switch (gender) {
            case "Neutral":
            case "Women":
            case "Men":
                this._gender = gender;
                break;
            default:
                throw new Error("gender must be 'Neutral', 'Women', or 'Men'");
        }
    }
}
exports.Features = Features;
class Restroom {
    constructor(id) {
        this._id = id;
        this._name = "";
        this._description = "";
        this.features = new Features();
        this.comments = new comments_1.CommentSection();
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
    }
}
exports.Restroom = Restroom;
