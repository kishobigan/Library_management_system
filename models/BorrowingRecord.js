const mongoose = require('mongoose')
const Schema = mongoose.Schema

const borrowingRecordSchema = new Schema({
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
    dueDate: { type: Date, required: true },
    fineAmount: { type: Number, default: 0 },
    member: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    staff: {type: Schema.Types.ObjectId, ref: 'Staff', required: true}
});

const BorrowingRecord = mongoose.model('BorrowingRecord', borrowingRecordSchema)

module.exports = BorrowingRecord