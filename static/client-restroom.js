"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const restroom_1 = require("../classes/restroom");
const comments_1 = require("../classes/comments");
const user_1 = require("../classes/user");
function restroomCreate() {
}
exports.restroomCreate = restroomCreate;
function restroomRead() {
}
exports.restroomRead = restroomRead;
function restroomUpdate() {
    (() => __awaiter(this, void 0, void 0, function* () {
        // get input DOM elements
        let nameElement = document.getElementById("name");
        let descElement = document.getElementById("desc");
        let genderElement = document.getElementById("gender");
        let accessibleElement = document.getElementById("accessible");
        let stallElement = document.getElementById("stall");
        let sanitaryElement = document.getElementById("sanitary");
        let lactationElement = document.getElementById("lactation");
        let towelsElement = document.getElementById("towels");
        let lockElement = document.getElementById("lock");
        let changingElement = document.getElementById("changing");
        let coversElement = document.getElementById("covers");
        let commentContentElement = document.getElementById("commentContent");
        // assign element values
        let name = "";
        let desc = "";
        let gender = "Neutral";
        let accessible = false;
        let stall = false;
        let sanitary = false;
        let lactation = false;
        let towels = false;
        let lock = false;
        let changing = false;
        let covers = false;
        let commentContent = "";
        if (nameElement) {
            name = nameElement.value;
        }
        if (descElement) {
            desc = descElement.value;
        }
        if (genderElement) {
            gender = genderElement.value;
        }
        if (accessibleElement) {
            accessible = accessibleElement.checked;
        }
        if (stallElement) {
            stall = stallElement.checked;
        }
        if (sanitaryElement) {
            sanitary = sanitaryElement.checked;
        }
        if (lactationElement) {
            lactation = lactationElement.checked;
        }
        if (towelsElement) {
            towels = towelsElement.checked;
        }
        if (lockElement) {
            lock = lockElement.checked;
        }
        if (changingElement) {
            changing = changingElement.checked;
        }
        if (coversElement) {
            covers = coversElement.checked;
        }
        if (commentContentElement) {
            commentContent = commentContentElement.value;
        }
        // construct Feature object
        let features = new restroom_1.Features();
        features.gender = gender;
        features.accessible = accessible;
        features.stall = stall;
        features.sanitary = sanitary;
        features.lactation = lactation;
        features.towels = towels;
        features.lock = lock;
        features.changing = changing;
        features.covers = covers;
        // construct CommentSection object
        let comments = new comments_1.CommentSection();
        let author = new user_1.User("someuser1");
        let comment = new comments_1.Comment(author);
        comment.content = commentContent;
        comments.add(comment);
        // construct Restroom object to POST
        let restroom = new restroom_1.Restroom(1234567890);
        restroom.name = name;
        restroom.description = desc;
        restroom.features = features;
        restroom.comments = comments;
        // debug
        console.log(restroom);
    }))();
}
exports.restroomUpdate = restroomUpdate;
function restroomDelete() {
}
exports.restroomDelete = restroomDelete;
function rating(x) {
    console.log(`overall rating: ${x}`);
}
exports.rating = rating;
function cleanliness(x) {
    console.log(`cleanliness rating: ${x}`);
}
exports.cleanliness = cleanliness;
function traffic(x) {
    console.log(`traffic rating: ${x}`);
}
exports.traffic = traffic;
