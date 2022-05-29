const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expensesSchema = new Schema({
    name: { type: String, required: true },
    budget: { type: Number, default: 0 }
}, {
    timestamps: true
});

module.exports = mongoose.model('Expenses', expensesSchema);;