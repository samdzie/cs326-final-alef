const {Restroom} = require("../dist/classes/restroom.js")


module.exports = function (app){
    app.get("/restroom/create",(req,res)=>{
        myRestroom = new Restroom(1);
        res.json(myRestroom)
    })
    app.post("/restroom/read",(req,res)=>{

    })
    app.post("/restroom/delete",(req,res)=>{

    })
    app.post("/restroom/update",(req,res)=>{

    })
}