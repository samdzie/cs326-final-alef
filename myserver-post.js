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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var restroom_1 = require("./classes/restroom");
var user_1 = require("./classes/user");
var comments_1 = require("./classes/comments");
var http = require('http');
var url = require('url');
var express = require('express');
var MyServer = /** @class */ (function () {
    // constructor(db) {
    // this.theDatabase = db;
    function MyServer() {
        var _this = this;
        // Server stuff: use express instead of http.createServer
        this.server = express();
        this.port = 8080;
        this.router = express.Router();
        this.restroom = new restroom_1.Restroom(1234567890);
        this.restroom.name = "ILC 123";
        this.restroom.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum, tortor posuere fermentum lacinia, justo odio mattis lacus, a suscipit lacus elit a mi. Nulla facilisi. Quisque ac risus ut ipsum pulvinar gravida quis non diam. Sed cursus purus id blandit suscipit. Nunc ac gravida justo. Sed metus velit, congue non arcu sit amet, bibendum laoreet velit. Nunc feugiat sapien eu nisi volutpat lobortis non sit amet tortor. Ut ullamcorper egestas justo et interdum. Nulla eget venenatis mauris. Donec auctor tristique erat.";
        this.restroom.features.gender = "Women";
        this.restroom.features.accessible = true;
        this.restroom.features.changing = true;
        this.restroom.features.covers = true;
        this.restroom.features.lactation = true;
        this.restroom.features.lock = true;
        this.restroom.features.sanitary = true;
        this.restroom.features.stall = true;
        this.restroom.features.towels = true;
        var newUser1 = new user_1.User("someuser1");
        var newComment1 = new comments_1.Comment(newUser1);
        newComment1.rating = 4;
        newComment1.cleanliness = 5;
        newComment1.traffic = 3;
        newComment1.content = "Pretty good.";
        var newUser2 = new user_1.User("someuser2");
        var newComment2 = new comments_1.Comment(newUser2);
        newComment2.rating = 3;
        newComment2.cleanliness = 4;
        newComment2.traffic = 4;
        newComment2.content = "Not bad.";
        this.restroom.comments.add(newComment1);
        this.restroom.comments.add(newComment2);
        // from https://enable-cors.org/server_expressjs.html
        this.router.use(function (request, response, next) {
            response.header('Content-Type', 'application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
        // Serve static pages from a particular path.
        this.server.use('/', express.static('./static'));
        this.server.use('/login', express.static('./static/login.html'));
        this.server.use('/restroom', express.static('./static/restroom.html'));
        this.server.use('/update', express.static('./static/update.html'));
        this.server.use('/search', express.static('./static/index.html'));
        // NEW: handle POST in JSON format
        this.server.use(express.json());
        // Set a single handler for a route.
        this.router.post('/create', this.createHandler.bind(this));
        // Set multiple handlers for a route, in sequence.
        this.router.post('/read', [this.errorHandler.bind(this), this.readHandler.bind(this)]);
        this.router.post('/update', [this.errorHandler.bind(this), this.updateHandler.bind(this)]);
        this.router.post('/delete', [this.errorHandler.bind(this), this.deleteHandler.bind(this)]);
        this.router.post('/search', [this.errorHandler.bind(this), this.searchHandler.bind(this)]);
        // Set a fall-through handler if nothing matches.
        this.router.post('*', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                response.send(JSON.stringify({ "result": "command-not-found" }));
                return [2 /*return*/];
            });
        }); });
        // Start up the counter endpoint at '/counter'.
        this.server.use('/restroom', this.router);
    }
    MyServer.prototype.errorHandler = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                value = true;
                // let value : boolean = await this.theDatabase.isFound(request.params['userId']+"-"+request.body.name);
                //	console.log("result from database.isFound: " + JSON.stringify(value));
                if (!value) {
                    response.write(JSON.stringify({ 'result': 'error' }));
                    response.end();
                }
                else {
                    next();
                }
                return [2 /*return*/];
            });
        });
    };
    MyServer.prototype.createHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createRestroom(response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.readHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readRestroom(request.body.id, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.updateHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateRestroom(request.body.id, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.deleteHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.deleteRestroom(request.body.id, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.searchHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.searchRestrooms(request.body.id, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.listen = function (port) {
        this.server.listen(port);
    };
    MyServer.prototype.createRestroom = function (response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("received create request");
                response.write(JSON.stringify({
                    "result": "created",
                    "id": this.restroom.id
                }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    MyServer.prototype.readRestroom = function (id, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("received read request for restroom " + id);
                response.write(JSON.stringify({
                    "result": "read",
                    "id": this.restroom.id,
                    "restroom": JSON.stringify(this.restroom)
                }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    MyServer.prototype.updateRestroom = function (id, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("received update request for restroom " + id);
                response.write(JSON.stringify({
                    "result": "updated",
                    "id": this.restroom.id
                }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    MyServer.prototype.deleteRestroom = function (id, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("received delete request for restroom " + id);
                response.write(JSON.stringify({
                    "result": "deleted",
                    "id": this.restroom.id
                }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    MyServer.prototype.searchRestrooms = function (id, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("received read request for restroom " + id);
                response.write(JSON.stringify({
                    "result": "found",
                    "id": this.restroom.id,
                    "restroom": JSON.stringify(this.restroom)
                }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    return MyServer;
}());
exports.MyServer = MyServer;
