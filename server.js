const express = require("express");
const bodyparser = require("body-parser");
const app = express();

const port = 80;

require("./routes")(app)
app.use(express.json())
app.use(express.static("./static"))
app.use(bodyparser.urlencoded({extended:false}))
app.listen(port,()=>{
    console.log("server live on " + port)
})