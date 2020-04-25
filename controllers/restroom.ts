import { Request, Response } from "express";

import {Restroom} from '../classes/restroom';

export let modify = (req: Request, res: Response) => {
    let restroom = req.body;
    //TODO: Add the restroom to mongo db using upsert, respond with added restroom json.
    res.json(restroom);
};
export let read = (req: Request, res: Response) => {
    let rr_id = req.body.rr_id;
    let restroom = new Restroom(rr_id);
    //TODO: fetch requested restroom from DB.
    res.json(restroom);
};
export let del = (req: Request, res: Response) => {
    let rr_id = req.body.rr_id;
    //TODO: Delete restroom from DB (by ID);
    res.json({
        deleted: rr_id,
    })
};