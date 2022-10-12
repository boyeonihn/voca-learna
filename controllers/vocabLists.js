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