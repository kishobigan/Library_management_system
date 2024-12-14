const mongoose = require('mongoose')
const Schema = mongoose.Schema

const memberSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    membershipType: { type: String, required: true },
    membershipStartDate: { type: Date, default: Date.now },
    membershipEndDate: { type: Date }
})

const Member = mongoose.model('Member', memberSchema)

module.exports = Member