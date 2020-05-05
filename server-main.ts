'use strict';

const port = process.env.PORT || 8080;

import { Database } from './mongo-database';
import { MyServer } from './myserver-post';

const database = new Database("restroom");
const server = new MyServer(database);

server.listen(port);
