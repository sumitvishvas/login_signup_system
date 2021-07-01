const Users=require('../model/user');
const mongoose=require('mongoose');
const bcrypt=require("bcrypt");
const addUser=(req,res)=>{
    var salt =bcrypt.genSaltSync(10);
    const hash =bcrypt.hashSync(req.body.password,salt);

    var data= new Users({
        _id:new mongoose.Types.ObjectId(),
        name :req.body.name,
        email :req.body.email,
        password :hash
    })
    data.save(function(error,result){
        if(error){
            console.log(error);
        }
        req.flash("message","Added Succesfully");
        res.redirect('login');
    })

    // console.log(`HASH-> ${hash}`);
    // console.log(req.body);
// res.status(201).render("add");

}

const loginCheck =async (req,res)=>{
    let email= req.body.email;
    var results =await Users.findOne({email:email});
    if (results){
        var check =await bcrypt.compare(req.body.password,results.password);
        if(check){
                    req.flash("message","Login Succesfully");

            // console.log(results._id);
            sess =req.session;
            sess._id=results._id;
            sess.name=results.name;
            sess.email=results.email;
            res.redirect('/');
        }else{
                    req.flash("message","Invalaid password");

            res.redirect('login');
        }

    }else{
         req.flash("message","Invalaid Email And Password");

            res.redirect('login');
    }
}

const userLogout =(req,res)=>{
       
    req.session.destroy((error)=>{
        if(error){
            console.log(error);
        }
       
        res.redirect('login');

    })
}

module.exports={
    addUser,
    loginCheck,
    userLogout
}