const Book = require('../models/Book')

const createBook = async (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'done'
    })
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