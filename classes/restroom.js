"use strict";
exports.__esModule = true;
var comments_1 = require("./comments");
var Features = /** @class */ (function () {
    function Features() {
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
    return Features;
}());
exports.Features = Features;
var Restroom = /** @class */ (function () {
    function Restroom(id) {
        this.id = id;
        this.name = "";
        this.building = "";
        this.description = "";
        this.features = new Features();
        this.comments = new comments_1.CommentSection();
    }
    return Restroom;
}());
exports.Restroom = Restroom;
