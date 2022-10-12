const VocabList = require('../models/VocabList')



module.exports = {
    getVocabLists: async (req,res)=>{
        console.log(req.user)
        try{
            const vocabLists = await VocabList.find({userId:req.user.id}); 
            res.render('vocablists.ejs', {vocablists: vocabLists, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createVocabList: async (req, res)=>{
        try{
            await VocabList.create({todo: req.body.todoItem, completed: false, userId: req.user.id})
            console.log('Vocab List has been added!')
            res.redirect('/vocablists')
        }catch(err){
            console.log(err)
        }
    },
    editVocabList: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    deleteVocabList: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    


/* 


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

*/ 