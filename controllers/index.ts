import * as rRestroom from "./restroom";
import { Router } from "express";

const Routes = (app: Router) => {

    app.post('/restroom/update', rRestroom.modify);
    app.post('/restroom/read', rRestroom.read);
    app.post('/restroom/del', rRestroom.del);
}

export default Routes;