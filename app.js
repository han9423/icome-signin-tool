const  setMod = require("./libs/setMod");
const db = require("./config").db;
const evnets = require("events");
const mod = setMod({
    express : "express",
    cookiePaser : "cookie-parser",
    cookieSession : "cookie-session",
    bodyParser : "body-parser",
    consolidate : "consolidate",
    path : "path",
    async : "async"
})


let server = mod.express();
let session_keys = [];
let eventEmitter = new evnets.EventEmitter();
let arrangeRouter = require("./routes/arrange");
let userRouter = require("./routes/user");
let indexRouter = mod.express.Router();
server.listen(3000,()=>{console.log("running on 3000")});


//config
server.use(mod.bodyParser.urlencoded({extended:false,limit:1024*1024}))
//cookie-parser
server.use(mod.cookiePaser("sdadsad80das8qg719ebxdsa78"))
// cookie-session 
for(let i=0;i<1000000;i++){
    session_keys.push("wanner_break"+ Math.random());
}
server.use(mod.cookieSession({
    name : "icome_s",
    keys : session_keys,
    maxAge : 3600,
}))
// 设置渲染
server.set("view engine","html");
server.set("views",__dirname+"/views")
server.engine("html",mod.consolidate.ejs)


//server
server.use("/",indexRouter);
server.get("/",function(req,res){
    db.query("SELECT `arrange` FROM `arrange_table`",(err,data)=>{
        if(err) console.log(err);
        res.render("index.ejs",{notes:data});
    })
})

indexRouter.use("/user",userRouter);
server.use("/arrange",arrangeRouter);

server.use(mod.express.static(__dirname+"/www"));












