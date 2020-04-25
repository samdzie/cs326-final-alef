import * as express from "express";
import * as bodyparser from "body-parser";
import Routes from "./controllers";

const app = express();
const port = 80;

app.use(express.static("./static"));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

Routes(app);

app.listen(port, function () {
    console.log("server live on " + port);
});