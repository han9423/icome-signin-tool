const express = require("express");
const bodyParser = require("body-parser");
const user_router = express.Router();
const multer = require("multer")
const fs = require("fs");
const db = require('../config').db;
const pathLib  = require("path")
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const crypto = require("crypto");


let theMulter = multer({dest:"/home/utter/Desktop/icome/www/upload"});
user_router.use(bodyParser.urlencoded({
    limit : 2 *1024*1024,
    extended : false
}))


user_router.use(theMulter.any());

user_router.post("/log",(req,res,next)=>{
    let logBody = req.body;
    if(logBody){
        db.query("SELECT `username`,`password`,`student_id` FROM `register_table` WHERE `student_id`=? LIMIT 1",[logBody.stu_id],(err,tempData)=>{
            if(err) {res.status(500).send("用户加载失败").end(); console.log(err)};
                if(Array.isArray(tempData)&&tempData.length>0){
                    if(tempData[0].username==logBody.username&&tempData[0].password==logBody.password&&tempData[0].student_id==logBody.stu_id){
                        db.query("SELECT * FROM `register_table` WHERE `student_id`=?",[logBody.stu_id],(err,data)=>{
                            if(err) console.log(err);
                                console.log(data)
                                res.send({"username":`${data[0].username}`,my_header:data[0].src,countNum:data[0].count});
                        })
                    }else{
                        res.send({"notice":"密码或用户名错误"});
                    }
                }else{
                    res.send({"none":"没有该用户"});
                }
            })
        }
})

user_router.post("/reg",(req,res,next)=>{
    var regBody = req.body;
    if(regBody.local_count){
        db.query("UPDATE `register_table` SET `count`=? WHERE `username`=?",[regBody.local_count,regBody.username],(err)=>{
            if(err) console.log(err);
        })
    }else{
        req.newName = req.files[0].path + pathLib.parse(req.files[0].originalname).ext;
        if(regBody){
            db.query("SELECT `student_id` FROM `register_table` WHERE `student_id`=? LIMIT 1",[regBody.reg_student],(err,data)=>{
                if(err) console.log(err);
    
                if(Array.isArray(data) && data.length>0){
                    if(data[0].student_id == regBody.reg_student) res.send({"notice":"该用户已经被注册"});
                }else{
                    var imageSrc = '/upload/' + req.files[0].filename + pathLib.parse(req.files[0].originalname).ext;
                    db.query("INSERT INTO `register_table` (`username`,`password`,`student_id`,`sex`,`qq_id`,`phone_number`,`reason`,`src`,`count`) VALUES (?,?,?,?,?,?,?,?,?)",[regBody.reg_username,regBody.reg_password,regBody.reg_student,regBody.sex,regBody.reg_qq,regBody.reg_moblie,regBody.reg_reason,imageSrc,0],(err,data)=>{
                        if(err) {console.log(err),res.status(500).send("服务器炸了").end()};
                        res.send({"done":"注册成功"});
                        next();
                    })
                }
                
            })
        }
    }



})

user_router.post("/reg",(req,res)=>{
    if(req.files != undefined){
        fs.rename(req.files[0].path,req.newName,(err)=>{if(err)console.log(err)})
    }
})

module.exports = user_router;