"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = require("body-parser");
const controllers_1 = require("./controllers");
const app = express_1.default();
const port = 80;
controllers_1.default(app);
app.use(express_1.default.json());
app.use(express_1.default.static("./static"));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.listen(port, () => {
    console.log("server live on " + port);
});
