const Book = require('../models/Book')
const isStaff = require('../utils/isStaff')

const createBook = async (req, res) => {
    const user = req.user
    if (!isStaff(user)) {
        return res.status(403).json({ message: 'You are not a staff member' })
    }

    const {title, author, isbn, publisher, edition, genre } = req.body

    if(!title || !author || !isbn || !publisher || !edition || !genre){
        return res.status(400).json({ message: 'Please fill in all fields' })
    }

    try{
        const book = new Book({
            title,
            author,
            isbn,
            publisher,
            edition,
            genre,
            createdBy: user._id
        })

        book.save()

        res.status(200).json({
            status: 'success',
            message: book
        })
    }catch(error){
        res.status(400).json({
            status: 'failed',
            message: 'Something went wrong'
        })
    }
}

const updateBook = async (req, res) => {
    const user = req.user
    if (!isStaff(user)) {
        return res.status(403).json({ message: 'You are not a staff member' })
    }

    const id = req.params.id
    if(!id){
        return res.status(400).json({ message: 'Please provide a valid id' })
    }

    const {title, author, isbn, publisher, edition, genre } = req.body

    if(!title || !author || !isbn || !publisher || !edition || !genre){
        return res.status(400).json({ message: 'Please fill in all fields' })
    }

    try{

        const updatedData = {
            title,
            author,
            isbn,
            publisher,
            edition,
            genre,
            updatedBy: user._id
        }

        const book = await Book.findByIdAndUpdate(id, updatedData, {new:true})

        if(!book){
            res.status(400).json({
                status: 'failed',
                message: 'book not found'
            })
        }
        res.status(200).json({
            status: 'success',
            message: 'done'
        })
    }catch(error){
        res.status(400).json({
            status: 'failed',
            message: 'something went wrong'
        })
    }
    
}

const getAllBook = async (req, res) => {
    const user = req.user
    if (!isStaff(user)) {
        return res.status(403).json({ message: 'You are not a staff member' })
    }

    try{
        const books = await Book.find()
        res.status(200).json({
            status: 'success',
            message: books
        })
    }catch(error){
        res.status(400).json({
            status: 'failed',
            message: 'something went wrong'
        })
    }
}

const getBookById = async (req, res) => {
    const user = req.user
    if (!isStaff(user)) {
        return res.status(403).json({ message: 'You are not a staff member' })
    }

    res.status(200).json({
        status: 'success',
        message: 'done'
    })
}

const getBookByCreatedBy = async (req, res) => {
    const user = req.user
    if (!isStaff(user)) {
        return res.status(403).json({ message: 'You are not a staff member' })
    }

    res.status(200).json({
        status: 'success',
        message: 'done'
    })
}

const removeBook = async (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'done'
    })
}

module.exports = {
    createBook,
    updateBook,
    getAllBook,
    getBookById,
    getBookByCreatedBy,
    removeBook
}