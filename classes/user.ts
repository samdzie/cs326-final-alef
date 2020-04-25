export class User {
    _username: string;

    constructor(username: string) {
        this._username = username;
    }

    get username() {
        return this._username;
    }
}

export class Login {
    _login : object;

    constructor(login: object) {
        this._login = {username, password};
    }

    get login() {
        return this.login;
    }
    
}