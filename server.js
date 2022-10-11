// Declare variables 
const bodyParser = require("body-parser");
const express = require("express");
const app = express(); 
const mongoose = require('mongoose'); 
const passport = require('passport'); 
const session = require('express-session'); 
const MongoStore = require('connect-mongo')(session); 
const flash = require('express-flash');
const logger = require('morgan'); 

// routes 
const mainRoutes = require('./routes/main'); 
const todoRoutes = require('./routes/todos');
const connectDB = require('./config/database'); 
require('dotenv').config({path: './config/.env'});   // dot file for the server to access tokens and files
const ObjectId = require('mongodb').ObjectId; 

// Passport config
require('./config/passport')(passport); 
connectDB(); 

// set middleware
app.set("view engine", "ejs"); // set up ejs
app.use(express.static('public'));
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
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


//GET METHOD 
app.get('/', (request, response) => {
    db.collection('vocabWords').find().toArray()
    .then(data => {
        response.render('index.ejs', {info: data})
    })
    .catch (error => console.error(error))
})


//POST METHOD
app.post('/addVocabList', (request, response) => {
    let wordSplit = request.body.wordList.split('\r\n').map(n => n.trim()).filter(n => n.length != 0); // splitting the 
    db.collection('vocabWords').insertOne({unit: request.body.unit, wordList: wordSplit, date: Date.now()})
    .then(result => {
        console.log('Vocabulary List created')
        response.redirect('/')
    })
    .catch(error => console.error(error))
}) // listening on default path 


// UPDATE 
    // delete WORD within list
app.put('/deleteSingleWord', (request, response) => {
    console.log(request.body); 
    db.collection('vocabWords').updateOne({unit: request.body.unitSelected},
        { $pull: { wordList: request.body.wordSelected}})
    .then(result => {
        console.log('One word removed');
        response.json('Word removed');
    })
    .catch(error => console.error(error))
})

    // update the actual word itself within the list
app
    .route("/edit/:id")
    .get((request, response) => {
        const id = request.params.id; 
        db.collection('vocabWords').findOne({_id: ObjectId(id)})
        .then(data => {
            response.render('edit.ejs', {info: data})
        })
        .catch (error => console.error(error))
    })
    .post((request, response) => {
        const id = request.params.id;
        wordSplit = request.body.wordList.split('\r\n').map(n => n.trim()).filter(n => n.length != 0);
        db.collection('vocabWords').findOneAndUpdate(
            {_id: ObjectId(id)},
            { $set: {
                unit: request.body.unit,
                wordList: wordSplit}
            }
        )
        .then(result => {
            console.log('Vocabulary List updated')
            response.redirect('/')
        })
        .catch(error => console.error(error))
    })
    
// DELETE
app.delete('/deleteVocabList', (request, response) => {
    console.log(request)
    db.collection('vocabWords').deleteOne({unit: request.body.unitNameSelect, wordList: request.body.wordListSelect})
    .then(result => {
        console.log('List deleted')
        response.json('List deleted')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteSingleWord', (request, response) => {
    console.log(request); 
})
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})     // set up our server - initialize 
