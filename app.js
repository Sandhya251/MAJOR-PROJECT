if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  

const express=require("express");
const app=express();
// Prevent favicon.ico 404 errors in development
app.get('/favicon.ico', (req, res) => res.status(204).end());


const mongoose =require("mongoose");
const path=require("path");
const methodOverride= require("method-override")
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const User = require("./models/user.js");
const  ejsMate = require('ejs-mate');

const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} =require("./schema.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


const session= require("express-session")
const MongoStore = require('connect-mongo');
const flash= require("connect-flash");
const passport=require("passport")
const LocalStrategy=require("passport-local")

const dbUrl=process.env.ATLASDB_URL;

main()
.then(() => {
    console.log("connection sucessful");
}
) 
.catch((err) => console.log(err));

async function main (){
    await mongoose.connect(dbUrl); //you can give database name any you want
 }


 app.engine("ejs", ejsMate); // should come BEFORE set view engine
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended :true}))
app.use(methodOverride("_method"))


const store= MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24 * 3600,
})

store.on("error", () => {
    console.log("ERROR in MONGO SESSION STORE")
});

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized: false,
    cookie:{
        expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true
    }
}

app.use(session(sessionOptions));
app.use(flash());        //before listings route

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate())); //login/signup

passport.serializeUser(User.serializeUser());   //to store the info related to user
passport.deserializeUser(User.deserializeUser());//unstore


app.use((req,res, next)=>{
    res.locals.currUser=req.user;
    console.log(" Current user:", req.user);
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})


app.use("/listings",listingRouter);      //for REST apis or routes
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

app.use('/', (req, res) => {
  res.render("./listings/index.ejs"); // or res.send('Welcome')
});

//any other random route or pageerror
app.all("*",(req,res,next)=> {
    next(new ExpressError(404,"page not found"));

})

//error handling middleware
app.use((err,req,res,next)=> {
    // res.send("something went wrong");
    console.error('Error details:', {
        message: err.message,
        stack: err.stack,
        originalUrl: req.originalUrl,
        method: req.method,
        body: req.body
      });
    let {statusCode=500, message="something went wrong"} =err;
    res.status(statusCode).render("error.ejs", {message});
});

console.log("REGISTERED ROUTES:");
app._router.stack
  .filter(layer => layer.route)
  .forEach(layer => {
    const methods = Object.keys(layer.route.methods).join(", ").toUpperCase();
    console.log(`${methods} ${layer.route.path}`);
  });

app.listen(8080, () => {
    console.log("server is working on port 8080")
})