const mongoose=require("mongoose");
var conn =require('../db/conn');


var userSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    password:String
},{
timestamps:true
})

let users=conn.model('users',userSchema);
module.exports=users;