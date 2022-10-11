const express = require('express')
const router = express.Router()
const vocabListsController = require('../controllers/vocabLists') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, vocabListsController.getVocabLists)

router.post('/createVocabList', vocabListsController.createVocabList)

router.put('/markComplete', vocabListsController.markComplete)

router.put('/markIncomplete', vocabListsController.markIncomplete)

router.delete('/deleteVocabList', vocabListsController.deleteVocabList)

module.exports = router