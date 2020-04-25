"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comments_1 = require("./comments");
class Features {
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
}
exports.Features = Features;
class Restroom {
    constructor(id) {
        this.id = id;
        this.name = "";
        this.building = "";
        this.description = "";
        this.features = new Features();
        this.comments = new comments_1.CommentSection();
    }
}
exports.Restroom = Restroom;
