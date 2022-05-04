const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expensesSchema = new Schema({
    name: String
});

const expenses = mongoose.model('Expenses', expensesSchema);

module.exports = expenses;