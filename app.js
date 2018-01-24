"use strict";
let express = require("express");
let app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let path = require("path");
let bodyParser = require("body-parser");
require('events').EventEmitter.defaultMaxListeners = Infinity;
// view, view-engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"));
// body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// static folder
app.use(express.static(path.join(__dirname,"public")));
// routes
let index = require("./routes/index")(io);
app.use(index);


let port = process.env.PORT||3000;
http.listen(port,()=>{
    console.log("Server is running on port "+ port)
})
