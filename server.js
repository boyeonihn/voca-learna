// Declare variables 
const bodyParser = require("body-parser");
const express = require("express");
const app = express(); 
const PORT = 8500; 
const MongoClient = require('mongodb').MongoClient; 
require('dotenv').config();   // dot file for the server to access tokens and files

let db, 
    dbConnectionStr = process.env.DB_CONNECTION,
    dbName = 'voca-learna'

//connect to mongodb
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

// set middleware
app.set("view engine", "ejs"); // set up ejs
app.use(express.static('public'));
app.use(express.urlencoded({extended: true})); // url parser - help validate the information that we are passing back and forth
// extended true allows us to pass arrays 
app.use(express.json());


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
    let wordSplit = request.body.wordList.split('\r\n') // splitting the 
    db.collection('vocabWords').insertOne({unit: request.body.unit, wordList: wordSplit, date: Date.now()})
    .then(result => {
        console.log('Vocabulary List created')
        response.redirect('/')
    })
    .catch(error => console.error(error))
}) // listening on default path 


// UPDATE 

app.listen(PORT, () => console.log(`Server is running on ${PORT}`)); // set up our server - initialize 
