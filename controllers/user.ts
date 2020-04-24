import { Request, Response } from "express"

import {User} from "../classes/user";

export let create = (req: Request, res: Response) => {
    let user = new User("test");

    res.json(user);
}