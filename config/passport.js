var GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require("passport");
const UserModel = require("../models/userModel");
const JWT_SECRECT_KEY = process.env.JWT_SECRECT_KEY;
var jwt =require('jsonwebtoken');
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8086/auth/google/callback"
  },
   async function(accessToken, refreshToken, profile,done) {
    console.log("profile", profile.emails[0].value);

   let user = await UserModel.findOne({googleId:profile.id})
   if(user){
    var token = jwt.sign({userId: user.id}, JWT_SECRECT_KEY);
   }
   else{
    let user1 = await UserModel.create({googleId:profile.id,name:profile.name,email:profile.email})
    var token = jwt.sign({userId: user1.id}, JWT_SECRECT_KEY);
   }
   done(null,user);
  }
));
passport.serializeUser((user, done)=> {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  let user = await UserModel.findById(id);
  done(null, user);
});