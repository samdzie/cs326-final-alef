'use strict';
exports.__esModule = true;
var myserver_post_1 = require("./myserver-post");
// const theDatabase = new Database('samdzie'); // CHANGE THIS
// const theServer = new MyServer(theDatabase);
var theServer = new myserver_post_1.MyServer();
theServer.listen(8080);
