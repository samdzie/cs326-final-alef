(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.client = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A data structure for user comments.
 */
class Comment {
    constructor(author) {
        this.author = author;
        this.content = "";
        this.time = new Date().getTime();
        this.rating = 0;
        this.traffic = 0;
        this.cleanliness = 0;
    }
}
exports.Comment = Comment;
/**
 * A wrapper class for a list of comments.
 */
class CommentSection {
    constructor() {
        this.list = [];
    }
    /**
     * Adds a given comment to the list.
     * @param comment Comment to be added
     */
    add(comment) {
        this.list.unshift(comment);
        this.calculateAverageRating();
        this.calculateAverageCleanliness();
        this.calculateAverageTraffic();
    }
    /**
     * Removes a given comment from the list.
     * @param comment Comment to be removed
     */
    remove(comment) {
        let idx = this.list.indexOf(comment);
        if (idx === -1) {
            throw new Error("comment not found");
        }
        this.list.splice(idx, 1);
    }
    /**
     * Returns a deep copy of comment list.
     */
    comments() {
        return this.list.slice();
    }
    /**
     * Returns average overall rating across comments.
     */
    calculateAverageRating() {
        this.averageRating = this.average(x => x.rating);
    }
    /**
     * Returns average cleanliness rating across comments.
     */
    calculateAverageCleanliness() {
        this.averageCleanliness = this.average(x => x.cleanliness);
    }
    /**
     * Returns average traffic rating across comments.
     */
    calculateAverageTraffic() {
        this.averageTraffic = this.average(x => x.traffic);
    }
    /**
     * Finds average across comment list for a given metric (rating, cleanliness, traffic).
     * @param callback Function to extract appropriate rating from comment
     */
    average(callback) {
        let ratings = this.list.map(callback);
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
        this.description = "";
        this.features = new Features();
        this.comments = new comments_1.CommentSection();
    }
}
exports.Restroom = Restroom;

},{"./comments":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(username) {
        this.username = username;
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
const url = "http://127.0.0.1:8080";
const postURL = url + "/restroom";
const fullstar = "&#9733;";
const blankstar = "&#9734;";
let restroom;
let rating = 0;
let cleanliness = 0;
let traffic = 0;
// get restroom ID from URL
// based on https://easyautotagging.com/javascript-get-url-parameter/
const query = window.location.search;
const parameters = new URLSearchParams(query);
let idParam = parameters.get("id");
let id = 0;
if (idParam) {
    id = parseInt(idParam);
    restroomRead();
}
else {
    restroomCreate();
}
// helper function from lecture 21 exercise
function postData(url, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify(data)
        });
        return resp;
    });
}
function restroomCreate() {
    (() => __awaiter(this, void 0, void 0, function* () {
        // send POST request
        const data = {};
        const newURL = postURL + "/create";
        console.log(`restroomCreate: fetching ${newURL}`);
        const response = yield (postData(newURL, data));
        const j = yield response.json();
        console.log(j);
        id = j.id;
        restroom = new restroom_1.Restroom(id);
        let updateButton = document.getElementById("updateButton");
        if (updateButton) {
            updateButton.innerText = "Create";
        }
    }))();
}
exports.restroomCreate = restroomCreate;
function restroomRead() {
    (() => __awaiter(this, void 0, void 0, function* () {
        // send POST request
        const data = {
            "id": id
        };
        const newURL = postURL + "/read";
        console.log(`restroomRead: fetching ${newURL}`);
        const response = yield (postData(newURL, data));
        const j = yield response.json();
        console.log(j);
        restroom = JSON.parse(j.restroom);
        if (window.location.pathname === "/update") {
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
            if (nameElement) {
                nameElement.value = restroom.name;
            }
            if (descElement) {
                descElement.value = restroom.description;
            }
            if (genderElement) {
                switch (restroom.features.gender) {
                    case "Neutral":
                        genderElement.selectedIndex = 0;
                        break;
                    case "Women":
                        genderElement.selectedIndex = 1;
                        break;
                    case "Men":
                        genderElement.selectedIndex = 2;
                        break;
                }
            }
            if (accessibleElement) {
                accessibleElement.checked = restroom.features.accessible;
            }
            if (stallElement) {
                stallElement.checked = restroom.features.stall;
            }
            if (sanitaryElement) {
                sanitaryElement.checked = restroom.features.sanitary;
            }
            if (lactationElement) {
                lactationElement.checked = restroom.features.lactation;
            }
            if (towelsElement) {
                towelsElement.checked = restroom.features.towels;
            }
            if (lockElement) {
                lockElement.checked = restroom.features.lock;
            }
            if (changingElement) {
                changingElement.checked = restroom.features.changing;
            }
            if (coversElement) {
                coversElement.checked = restroom.features.covers;
            }
        }
        else if (window.location.pathname === "/restroom") {
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
            if (nameElement) {
                nameElement.innerText = restroom.name;
            }
            if (descElement) {
                descElement.innerText = restroom.description;
            }
            if (genderElement) {
                genderElement.innerText = restroom.features.gender;
            }
            if (accessibleElement) {
                if (restroom.features.accessible) {
                    accessibleElement.innerText = "Yes";
                }
            }
            if (stallElement) {
                if (restroom.features.stall) {
                    stallElement.innerText = "Yes";
                }
            }
            if (sanitaryElement) {
                if (restroom.features.sanitary) {
                    sanitaryElement.innerText = "Yes";
                }
            }
            if (lactationElement) {
                if (restroom.features.lactation) {
                    lactationElement.innerText = "Yes";
                }
            }
            if (towelsElement) {
                if (restroom.features.towels) {
                    towelsElement.innerText = "Yes";
                }
            }
            if (lockElement) {
                if (restroom.features.lock) {
                    lockElement.innerText = "Yes";
                }
            }
            if (changingElement) {
                if (restroom.features.changing) {
                    changingElement.innerText = "Yes";
                }
            }
            if (coversElement) {
                if (restroom.features.covers) {
                    coversElement.innerText = "Yes";
                }
            }
            setRating(Math.ceil(restroom.comments.averageRating));
            setCleanliness(Math.ceil(restroom.comments.averageCleanliness));
            setTraffic(Math.ceil(restroom.comments.averageTraffic));
            if (restroom.comments) {
                let comments = restroom.comments.list;
                for (let i = 0; i < comments.length; i++) {
                    let username = comments[i].author.username;
                    let contents = comments[i].content;
                    let commentDiv = createCommentElement(username, contents);
                    let commentSection = document.getElementById("commentSection");
                    if (commentSection) {
                        commentSection.appendChild(commentDiv);
                    }
                }
            }
        }
    }))();
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
        // data validation
        if (rating === 0 || cleanliness === 0 || traffic === 0) {
            alert("You must give an overall, cleanliness, and traffic rating.");
            return;
        }
        // construct Feature object
        let features = restroom.features;
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
        let comments = restroom.comments;
        let author = new user_1.User("someuser1");
        let comment = new comments_1.Comment(author);
        comment.content = commentContent;
        comment.rating = rating;
        comment.cleanliness = cleanliness;
        comment.traffic = traffic;
        comments.add(comment);
        // construct Restroom object to POST
        restroom.name = name;
        restroom.description = desc;
        restroom.features = features;
        restroom.comments = comments;
        // send POST request
        const data = {
            "id": restroom.id,
            "restroom": restroom
        };
        const newURL = postURL + "/update";
        console.log(`restroomUpdate: fetching ${newURL}`);
        const response = yield (postData(newURL, data));
        const j = yield response.json();
        console.log(j);
        window.location.href = url + "/restroom?id=" + id;
    }))();
}
exports.restroomUpdate = restroomUpdate;
function restroomDelete() {
    (() => __awaiter(this, void 0, void 0, function* () {
        // send POST request
        const data = {
            "id": id
        };
        const newURL = postURL + "/delete";
        console.log(`restroomDelete: fetching ${newURL}`);
        const response = yield (postData(newURL, data));
        const j = yield response.json();
        console.log(j);
        window.location.href = url;
    }))();
}
exports.restroomDelete = restroomDelete;
function setRating(x) {
    rating = x;
    changeStars("rating", 1, x, true);
    changeStars("rating", x + 1, 5, false);
}
exports.setRating = setRating;
function setCleanliness(x) {
    cleanliness = x;
    changeStars("cleanliness", 1, x, true);
    changeStars("cleanliness", x + 1, 5, false);
}
exports.setCleanliness = setCleanliness;
function setTraffic(x) {
    traffic = x;
    changeStars("traffic", 1, x, true);
    changeStars("traffic", x + 1, 5, false);
}
exports.setTraffic = setTraffic;
function changeStars(type, from, to, filled) {
    if (from > to) {
        return;
    }
    for (let i = from; i <= to; i++) {
        let starElement = document.getElementById(type + i);
        if (starElement) {
            if (filled) {
                starElement.innerHTML = fullstar;
            }
            else {
                starElement.innerHTML = blankstar;
            }
        }
    }
}
function goToUpdate() {
    window.location.href = url + "/update?id=" + id;
}
exports.goToUpdate = goToUpdate;
function createCommentElement(username, contents) {
    let div = document.createElement("div");
    div.classList.add("comment");
    let h3 = document.createElement("h3");
    let usernameText = document.createTextNode(username);
    h3.appendChild(usernameText);
    let p = document.createElement("p");
    let commentText = document.createTextNode(contents);
    p.appendChild(commentText);
    div.appendChild(h3);
    div.appendChild(p);
    return div;
}

},{"../classes/comments":1,"../classes/restroom":2,"../classes/user":3}]},{},[4])(4)
});
