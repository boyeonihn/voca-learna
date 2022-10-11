const mongoose = require('mongoose')

const VocabListSchema = new mongoose.Schema({
  unit: {
    type: String,
    required: true,
  },
  wordList: {
    type: Array,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('VocabList', VocabListSchema); 
