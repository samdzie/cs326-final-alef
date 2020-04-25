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
    userName : string;
    password : string;

    constructor(userName : string, password : string) {
        this.userName = userName;
        this.password = password;
    }

    get login() {
        return this.login;
    }
    
}