import { Request, Response } from "express"

import {User} from "../classes/user";

export let create = (req: Request, res: Response) => {
    let username = req.body.username;
    let user = new User("test");

    res.json(user);
}

export let login = (req: Request, res: Response) => {
    let login = req.body.login;

    res.json(user);
};