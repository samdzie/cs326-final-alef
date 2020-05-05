'use strict';

//const port = process.env.PORT || 8080;

import { Database } from './mongo-database';
import { MyServer } from './myserver-post';

const theServer = new MyServer();
const database = new Database("main");
const server = new MyServer();

server.listen(8080);
