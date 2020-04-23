const express = require("express");

const app = express();

const port = 80;

require("./routes")(app)
app.use(express.json())
app.use(express.static("./static"))

app.listen(port,()=>{
    console.log("server live on " + port)
})