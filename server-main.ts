'use strict';

import { Database } from './mongo-database';
import { MyServer } from './myserver-post';

// const theDatabase = new Database('samdzie'); // CHANGE THIS
// const theServer = new MyServer(theDatabase);

const theServer = new MyServer();

theServer.listen(8080);
