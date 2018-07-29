const express = require("express");
const arrange_router = express.Router();
const db = require('../config').db;

arrange_router.get("/storage",function(req,res){
    for(let prop in req.query){
        if(prop=="deleteStorage"){
            db.query("DELETE FROM `arrange_table` WHERE `arrange`= ?",[req.query[prop]],(err)=>{if(err)console.log(err)});
        }else if(prop!="deleteStorage"){
            db.query("SELECT * FROM `arrange_table` WHERE `arrange`=? LIMIT 1",[req.query[prop]],(err,data)=>{
                if(err) console.log(err);
                if(Array.isArray(data)&&data.length==0){
                    db.query("INSERT INTO `arrange_table` (`arrange`) VALUES(?)",[req.query[prop]],(err)=>{if(err)console.log(err)});
                }
            })
        }
    }
    res.end();
})

module.exports = arrange_router;