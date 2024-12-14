const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {type:String, required:true},
    author: {type: String, required:true},
    isbn: { type: String, required: true, unique: true },
    publisher: { type: String, required: true },
    edition: { type: String },
    genre: { type: String },
    availabilityStatus: { type: Boolean, default: true },
})

const Book = mongoose.model('Book', BookSchema)

module.exports = Book