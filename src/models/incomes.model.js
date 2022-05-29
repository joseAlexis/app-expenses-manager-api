const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomesSchema = new Schema({
    name: {type: String, required: true}
}, {
    timestamps: true
});

module.exports = mongoose.model('Incomes', incomesSchema);