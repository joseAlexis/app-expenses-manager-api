const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomesSchema = new Schema({
    name: String
});

const incomes = mongoose.model('Incomes', incomesSchema);

module.exports = incomes;