'use strict';

const port = process.env.PORT || 8080;

import { Database } from './mongo-database';
import { MyServer } from './myserver-post';

const theDatabase = new Database('main'); // CHANGE THIS
const theServer = new MyServer(theDatabase);

theServer.listen(port);
