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
const url = "http://127.0.0.1:8080";
const postURL = url + "/home";
const fullstar = "&#9733;";
const blankstar = "&#9734;";
let target;
let rating = 0;
let cleanliness = 0;
let traffic = 0;
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
function search() {
    (() => __awaiter(this, void 0, void 0, function* () {
        //read things from the html
        let buildingElement = document.getElementById("building");
        let genderElement = document.getElementById("gender");
        let accessibleElement = document.getElementById("accessible");
        let lactationElement = document.getElementById("lactation");
        let changingElement = document.getElementById("changing");
        let stallElement = document.getElementById("stall");
        let towelsElement = document.getElementById("towels");
        let coversElement = document.getElementById("covers");
        let sanitaryElement = document.getElementById("sanitary");
        let lockElement = document.getElementById("lock");
        //target is initalized as a restroom object with dummy ID 123
        /*if an element of target is not set to its default, then the server
        will use it as one of the search params**/
        target = new restroom_1.Restroom(123);
        if (buildingElement) {
            target.building = buildingElement.value;
        }
        if (genderElement) {
            target.features.gender = genderElement.value;
        }
        if (accessibleElement) {
            target.features.accessible = accessibleElement.checked;
        }
        if (lactationElement) {
            target.features.lactation = lactationElement.checked;
        }
        if (changingElement) {
            target.features.changing = changingElement.checked;
        }
        if (stallElement) {
            target.features.stall = stallElement.checked;
        }
        if (towelsElement) {
            target.features.towels = towelsElement.checked;
        }
        if (coversElement) {
            target.features.covers = coversElement.checked;
        }
        if (sanitaryElement) {
            target.features.sanitary = sanitaryElement.checked;
        }
        if (lockElement) {
            target.features.lock = lockElement.checked;
        }
        console.log("got here");
        //pass them to the backend
        // construct Restroom object to POST
        target.name = "";
        target.description = "";
        // send POST request
        const data = {
            "restroom": target
        };
        const newURL = postURL + "/search";
        console.log(`searching: fetching ${newURL}`);
        const response = yield (postData(newURL, data));
        const j = yield response.json();
        console.log(j);
        let restrooms = JSON.parse(j.restroom);
        let resultElement = document.getElementById("results");
        for (let i = 0; i < restrooms.length; i++) {
            resultElement.insertAdjacentHTML("beforeend", '<div class="row"><div class="col-md-5 col-sm-12" class="result-container-image"><img src="' + restrooms[i].image + '" class="img-fluid"/></div><div class="col-md-7 col-sm-12" class="result-container-text"><h3><a href="http://127.0.0.1:8080/restroom?id=' + restrooms[i].id + '">' + restrooms[i].name + '</a></h3><p>' + restrooms[i].description + '</p></div></div><br/>');
        }
    }))();
}
exports.search = search;
//get results from the backend
//post them to the html
//using a lot of html.innerelement and outerelement baiscally
//linking to index.html
