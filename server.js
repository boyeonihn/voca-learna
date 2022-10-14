// Declare variables 
const express = require("express");
const app = express(); 
const mongoose = require('mongoose'); 
const passport = require('passport'); 
const session = require('express-session'); 
const MongoStore = require('connect-mongo'); 

const flash = require('express-flash');
const logger = require('morgan'); 

// routes 
const mainRoutes = require('./routes/main'); 
const vocabListRoutes = require('./routes/vocablists');


const connectDB = require('./config/database'); 
require('dotenv').config({path: './config/.env'});   // dot file for the server to access tokens and files 

// Passport config
require('./config/passport')(passport); 

connectDB(); 

// set middleware
app.set("view engine", "ejs"); // set up ejs
app.use(express.static('public'));

//body parser 
app.use(express.urlencoded({extended: true})); // url parser - help validate the information that we are passing back and forth
// extended true allows us to pass arrays 
app.use(express.json());
app.use(logger('dev')); 

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ 
        client: mongoose.connection.getClient()}),
    })
  )

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash()); 

// adding Routes for MVC structure 
app.use('/', mainRoutes)
app.use('/vocablists', vocabListRoutes) 

app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})     // set up our server - initialize 
