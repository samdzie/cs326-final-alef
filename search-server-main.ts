'use strict';

import { Database } from './mongo-database';
import { MyServer } from './search-server';

const theServer = new MyServer();

theServer.listen(8080);