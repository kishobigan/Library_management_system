const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true },
    createdBy: {type: Schema.Types.ObjectId, ref:'Staff', required:true}
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } // Enable custom timestamp fields
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;