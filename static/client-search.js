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
var target;
//from in class exercise
function postData(url, data) {
    return __awaiter(this, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url, {
                        method: 'POST',
                        mode: 'cors',
                        cache: 'no-cache',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        redirect: 'follow',
                        body: JSON.stringify(data)
                    })];
                case 1:
                    resp = _a.sent();
                    return [2 /*return*/, resp];
            }
        });
    });
}
function search() {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var buildingElement, genderElement, accessibleElement, lactationElement, changingElement, stallElement, towelsElement, coversElement, sanitaryElement, lockElement, data, newURL, response, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    buildingElement = document.getElementById("building");
                    genderElement = document.getElementById("gender");
                    accessibleElement = document.getElementById("accessible");
                    lactationElement = document.getElementById("lactation");
                    changingElement = document.getElementById("changing");
                    stallElement = document.getElementById("stall");
                    towelsElement = document.getElementById("towels");
                    coversElement = document.getElementById("covers");
                    sanitaryElement = document.getElementById("sanitary");
                    lockElement = document.getElementById("lock");
                    //target is initalized as a restroom object with dummy ID 123
                    /*if an element of target is not set to its default, then the server
                    will use it as one of the search params**/
                    target = new restroom_1.Restroom(id);
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
                    data = {
                        "restroom": target
                    };
                    newURL = url + "/search";
                    console.log("restroomUpdate: fetching " + newURL);
                    return [4 /*yield*/, (postData(newURL, data))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    j = _a.sent();
                    console.log(j);
                    return [2 /*return*/];
            }
        });
    }); })();
}
const _search = search;
export { _search as search };
