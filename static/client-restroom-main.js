(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.client = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A data structure for user comments.
 */
class Comment {
    constructor(author) {
        this._author = author;
        this._content = "";
        this._time = new Date().getTime();
        this._rating = 0;
        this._traffic = 0;
        this._cleanliness = 0;
    }
    get author() {
        return this._author;
    }
    get content() {
        return this._content;
    }
    set content(content) {
        this._content = content;
    }
    get time() {
        return this._time;
    }
    get rating() {
        return this._rating;
    }
    set rating(rating) {
        if (rating >> 0 != rating || rating < 1 || rating > 5) {
            throw new Error("rating must be an integer in range 1 to 5 inclusive");
        }
        this._rating = rating;
    }
    get traffic() {
        return this._traffic;
    }
    set traffic(traffic) {
        if (traffic >> 0 != traffic || traffic < 1 || traffic > 5) {
            throw new Error("traffic must be an integer in range 1 to 5 inclusive");
        }
        this._traffic = traffic;
    }
    get cleanliness() {
        return this._cleanliness;
    }
    set cleanliness(cleanliness) {
        if (cleanliness >> 0 != cleanliness || cleanliness < 1 || cleanliness > 5) {
            throw new Error("cleanliness must be an integer in range 1 to 5 inclusive");
        }
        this._cleanliness = cleanliness;
    }
}
exports.Comment = Comment;
/**
 * A wrapper class for a list of comments.
 */
class CommentSection {
    constructor() {
        this._list = [];
    }
    /**
     * Adds a given comment to the list.
     * @param comment Comment to be added
     */
    add(comment) {
        this._list.push(comment);
    }
    /**
     * Removes a given comment from the list.
     * @param comment Comment to be removed
     */
    remove(comment) {
        let idx = this._list.indexOf(comment);
        if (idx === -1) {
            throw new Error("comment not found");
        }
        this._list.splice(idx, 1);
    }
    /**
     * Returns a deep copy of comment list.
     */
    comments() {
        return this._list.slice();
    }
    /**
     * Returns average overall rating across comments.
     */
    averageRating() {
        return this.average(x => x.rating);
    }
    /**
     * Returns average cleanliness rating across comments.
     */
    averageCleanliness() {
        return this.average(x => x.cleanliness);
    }
    /**
     * Returns average traffic rating across comments.
     */
    averageTraffic() {
        return this.average(x => x.traffic);
    }
    /**
     * Finds average across comment list for a given metric (rating, cleanliness, traffic).
     * @param callback Function to extract appropriate rating from comment
     */
    average(callback) {
        let ratings = this._list.map(callback);
        let sum = ratings.reduce(function (total, next) {
            return total + next;
        });
        return sum / ratings.length;
    }
}
exports.CommentSection = CommentSection;

},{}],2:[function(require,module,exports){
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

},{"./comments":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(username) {
        this._username = username;
    }
    get username() {
        return this._username;
    }
}
exports.User = User;

},{}],4:[function(require,module,exports){
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

},{"../classes/comments":1,"../classes/restroom":2,"../classes/user":3}]},{},[4])(4)
});
