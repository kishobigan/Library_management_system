const express = require('express')

const {
    createBook,
    updateBook,
    getAllBook,
    getBookById,
    getBookByCreatedBy,
    removeBook
} = require('../controllers/bookController')
const authToken = require('../middleware/authMiddleware')


const router = express.Router()

router.post('/create-book', authToken, createBook)
router.put('/update-book/:id', authToken, updateBook)
router.get('/get-all-book', authToken, getAllBook)
router.get('/get-book/:id', authToken, getBookById)
router.get('/get-book-by-created-by/:id', authToken, getBookByCreatedBy)
router.delete('/remove-book/:id', authToken, removeBook)

module.exports = router