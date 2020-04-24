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
