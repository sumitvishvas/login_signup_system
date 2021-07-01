require('dotenv').config();
const express=require("express");
const path=require("path");


// const ejs=require("ejs");
var flash = require('connect-flash');
const app=express();

var session = require('express-session');
var cookieParser = require('cookie-parser');
app.use(cookieParser('dcfshjgcgfdsghcfsgaxfdfgasdxfasxs'));
// app.use(flash());

app.use(session({
    secret:'dcfshjgcgfdsghcfsgaxfdfgasdxfasxs',
    resave:true,
    saveUninitialized:true,
    // cookie:{maxAge:40000}
}))
app.use(flash());

const port = process.env.PORT || 8080;

const templatepath = path.join(__dirname, "../templates/views");


app.use("/bscss",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use("/bsjs",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use("/jquery",express.static(path.join(__dirname,"../node_modules/jquery/dist")));
app.use("/script",express.static(path.join(__dirname,"../public/script.js")));
// console.log(templatepath);
// console.log(path.join(__dirname,"../templates/views"));

app.set('view engine','ejs');
app.set('views',templatepath);
app.use('/',require('./route'));




app.listen(port,()=>{
    console.log(`Port is Running , Port is ${port}`);
})