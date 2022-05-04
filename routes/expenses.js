const Expenses = require('../models/Expenses');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

router.use(bodyParser.json());

router.get('/setup', function (req, res) {
    // Seed DB
    const expensesList = [
        {
            name: 'Supermarket'
        },
        {
            name: 'Restaurants'
        },
        {
            name: 'Transportation'
        }
    ];

    Expenses.create(expensesList, function (err, results) {
        res.send(results);
    });
});

router.get('/', (req, res) => {
    Expenses.find({}, (err, expenses) => {
        if (err) throw err;

        res.send(expenses);
    });
});

router.get('/id/:value', (req, res) => {
    Expenses.findById({ _id: req.params.value }, (err, expense) => {
        if (err) throw err;

        res.send(expense);
    });
});

router.post('/', (req, res) => {
    let newExpense = Expenses({
        name: req.body.name
    });

    newExpense.save((err) => {
        if(err) throw err;

        res.send('Success')
    });
});

router.put('/', (req, res) => {
    Expenses.findByIdAndUpdate(req.body.id, {
        name: req.body.name
    }, (err) => {
        if(err) throw err;

        res.send('Success')
    })
});

router.delete('/', (req, res) => {
    Expenses.findByIdAndRemove(req.body.id, (err) => {
        if(err) res.send(err);

        res.send("Success");
    });
});

module.exports = router;