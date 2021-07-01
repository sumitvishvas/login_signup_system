const express = require("express");
const path = require('path');
const userCtrl = require('./controller/userCtrl');
const Users = require('./model/user');
var router = express.Router();

// var multer = require('multer');
// var upload =multer();
// var upload = multer({ dest: 'uploads/' })
router.use(express.urlencoded({ extended: true }));
router.get("/", async (req, res) => {
  // console.log(req.session);

  // console.log(result.name);
  // console.log(sess);
  if (req.session.email) {
    var result = await Users.findOne({ _id: req.session._id });
    res.render("index", { result, message: req.flash('message') });
  } else {
    req.flash("message", "Please Login");

    res.redirect('login');
  }

});
router.get("/add", (req, res) => {
  if (!req.session.email) {
    res.status(201).render("add");
  } else {
    res.redirect('/');
  }
});
router.get("/login", (req, res) => {
  // console.log(req.session);
  if (!req.session.email) {
    res.status(201).render("login", { message: req.flash('message') });
  } else {
    res.redirect('/');
  }





});

router.post("/login_user", upload.any(), userCtrl.loginCheck);
router.post("/add_user", upload.any(), userCtrl.addUser);
router.get("/logout", userCtrl.userLogout);



module.exports = router;
