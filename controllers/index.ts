import { Router } from "express";
import * as rRestroom from "./restroom";
import * as rUser from "./user";

const Routes = (app: Router) => {
    app.post('/restroom/update', rRestroom.modify);
    app.post('/restroom/read', rRestroom.read);
    app.post('/restroom/del', rRestroom.del);

    app.post('/user/create', rUser.create);

}

export default Routes;