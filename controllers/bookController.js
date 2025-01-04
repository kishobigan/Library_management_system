const Book = require('../models/Book')
const isStaff = require('../utils/isStaff')

const createBook = async (req, res) => {
    const user = req.user
    if (!isStaff(user)) {
        return res.status(403).json({ message: 'You are not a staff member' })
    }

    const {title, author, isbn, publisher, edition, genre ,availabilityStatus} = req.body

    if(!title || !author || !isbn || !publisher || !edition || !genre || !availabilityStatus){
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
            availabilityStatus,
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
    res.status(200).json({
        status: 'success',
        message: 'done'
    })
}

const getAllBook = async (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'done'
    })
}

const getBookById = async (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'done'
    })
}

const getBookByCreatedBy = async (req, res) => {
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