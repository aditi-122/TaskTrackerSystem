const express = require("express");
const connectToDb = require("./config/mongo.config");
const app = express();
require('dotenv').config();
require("./config/passport");
const passport = require("passport");
const session = require("express-session");
const PORT = process.env.PORT || 8086;
const UserRoute = require("./routes/user.route"); // Add this line to import UserRoute
app.use(express.json());
const TaskRoute = require("./routes/task.route")
app.use(passport.initialize());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(passport.session());
app.use("/users", UserRoute);
app.get("/", (req, res) => {
  res.status(200).json({ msg: "This is text route" })
})
app.use("/tasks",TaskRoute)
app.get("/signup", (req, res) => {
  res.send(`<a herf="/auth/google"> signup with google</a>`)
})
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }
));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure'
  }));
// app.get("/auth/google/success", passport.authenticate('google', { session: false }), (req, res) => {
//   res.send({ mg: "welcome to website", token: req.user.token });
// })
app.get("/auth/google/failure", (req, res) => {
  res.send("Google Login failed")
})
app.listen(PORT, () => {
  connectToDb();
  console.log("Server started");
});