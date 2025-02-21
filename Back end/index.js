const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require('cors')
const path = require("path");
const Destination = require("./model/DestinationModel.js");
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./model/UserModel.js');
const BookedUser=require('./model/BookingModel.js');
const newUserQuery=require('./model/QueryModel.js');
const session = require('express-session');
const { register } = require("module");
const {isLoggedIn}=require("../Backend/middleware.js")


app.use(express.json());
app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"public")));


app.use(express.urlencoded({extended:true}));



  app.use(session({
    secret: 'travelWorld',  // Secret key to sign the session ID cookie
    resave: false,              // Do not save session if it was not modified
    saveUninitialized: true,    // Save session even if it is not initialized
    cookie: { secure: false }   // In production, use secure: true with HTTPS
  }));
  


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(function(user, done) {
  done(null, user._id);  // Store the user ID in the session
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);  // Use async/await to retrieve the user
    done(null, user);  // Pass the user object to req.user
  } catch (err) {
    done(err, null);  // Pass any error to Passport
  }
});


app.post("/signUp",async (req,res)=>{
  try{
    let {username,email,phoneNumber,password,confirmpassword}=req.body;
    if (password !== confirmpassword) {
     res.json({ message: "Passwords do not match" });
    }
    let newUser= new User({email,username,phoneNumber});
    const registeredUser=await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
      if(err){
        next(err);
      }
      res.redirect("http://127.0.0.1:5500/HTML/Home.html");
    });
    
   
   
  }catch(error){
    console.log(error); 
    res.send("Error Occurred");
  }

});
app.post('/signIn', 
  passport.authenticate("local",{failureRedirect:"/signIn"}),
  async (req, res) => {
   console.log(req.user);
    res.redirect("http://127.0.0.1:5500/HTML/Home.html");
  }
);

app.get("/signOut",async (req,res)=>{
req.logOut((err)=>{
  if(err){
    console.log(err);
  }
  res.redirect("http://127.0.0.1:5500/HTML/Home.html");
})
});
app.get('/loginStatus', (req, res) => {
  res.json({ isLoggedIn: req.isAuthenticated() });
});




main().then((res) => {
    console.log("connection successfully");
}).catch((err) => console.log(err));



async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/destinations' );
}


app.get('/search', async (req, res) => {
  const location = req.query.location;

  const destinations = await Destination.find({ location: location });
  
  if (!destinations || destinations.length === 0) {
     res.render("index.ejs", { destinations: [] });
}

  res.render("index.ejs",{ destinations });
});


app.get('/packages',async (req,res)=>{
  const packages = await Destination.find();
  res.json(packages);
  

});
app.post("/bookedUser",async (req,res)=>{
  try{
    let {Location,Arrival,Leaving,Persons,
      Price}=req.body;
   
    let newbookedUser= new BookedUser({Location,Arrival,Leaving,Persons,Price});
   await newbookedUser.save();
   const allBookings = await BookedUser.find(); 
   res.render("booking.ejs", { newBooking: allBookings });
   
   
  }catch(error){
    console.log(error); 
    res.send("Error Occurred");
  }

});
app.post("/userQuery",async (req,res)=>{
  try{
    let {username,email,subject,message}=req.body;
   
    let newQuery= new newUserQuery({username,email,subject,message});
   await newQuery.save();
   const allQueries = await newUserQuery.find(); 
   res.render("query.ejs", { newQueries:allQueries });
   
   
  }catch(error){
    console.log(error); 
    res.send("Error Occurred");
  }

});


  app.listen(8080, () => {
    console.log("server is listening to port 8080");
  });