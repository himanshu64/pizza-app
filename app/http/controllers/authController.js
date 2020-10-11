const User = require("../../models/user");
const bcrypt = require('bcrypt');
const passport = require("passport");
function authController() {
  return {
    logout(req, res){
      req.logout()
      return res.redirect('/login')
    },
    login(req, res) {
      res.render("auth/login");
    },
    postLogin(req, res, next){
      const { email, password } = req.body;
      if (!email || !password) {
        req.flash("error", "* All fields are required");
        

       return res.redirect("/login");
      }
      passport.authenticate('local',(err, user, info)=>{
        if(err){
      

          req.flash('error',info.message)
          return next(err)
        }
        if(!user){
          req.flash('error',info.message)
          return res.redirect('/login')
        }

        req.logIn(user, (err)=> {
          if(err){
            console.log("post login call",err);
            req.flash('error',info.message)
            return next(err)
          }
          return res.redirect('/');
        })
      })(req, res, next);
    },
    register(req, res) {
      res.render("auth/register");
    },
    async postRegister(req, res) {
      console.log("request called");
      const { name, email, password } = req.body;
      //validate request

      if (!name || !email || !password) {
        req.flash("error", "All fields are required");
        req.flash("name", name);
        req.flash("email", email);

       return res.redirect("/register");
      }
      //check email
      User.exists({ email: email }, (err, result) => {
        if (result) {
          req.flash("error", "Email Already taken");
          req.flash("name", name);
          req.flash("email", email);

         return res.redirect("/register");
        }
      });
      //Hash Password
      const hashedPassword = await bcrypt.hash(password,10);

      //Create User
      const user = new User({
          name,
          email,
          password:hashedPassword
      })
      user.save().then((user)=>{
        //Login

        return res.redirect('/');
      }).catch(err => {
        req.flash("error", "Something went wrong");
        

       return res.redirect("/register");

      });
      console.log(req.body);
    },
    
  };

}

module.exports = authController;
