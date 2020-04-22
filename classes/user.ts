export class User {
    _username: string;

    constructor(username: string) {
        this._username = username;
    }

    get username() {
        return this._username;
    }
}