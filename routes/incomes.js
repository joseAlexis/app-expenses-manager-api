const Incomes = require('../models/Incomes');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

router.use(bodyParser.json());

router.get('/setup', function (req, res) {
    // Seed DB
    const incomesList = [
        {
            name: 'Salary'
        },
        {
            name: 'Interest'
        },
        {
            name: 'Other'
        }
    ];

    Incomes.create(incomesList, function (err, results) {
        res.send(results);
    });
});

router.get('/', (req, res) => {
    Incomes.find({}, (err, expenses) => {
        if (err) throw err;

        res.send(expenses);
    });
});

router.get('/id/:value', (req, res) => {
    Incomes.findById({ _id: req.params.value }, (err, expense) => {
        if (err) throw err;

        res.send(expense);
    });
});

router.post('/', (req, res) => {
    let newExpense = Incomes({
        name: req.body.name
    });

    newExpense.save((err) => {
        if(err) throw err;

        res.send('Success')
    });
});

router.put('/', (req, res) => {
    Incomes.findByIdAndUpdate(req.body.id, {
        name: req.body.name
    }, (err) => {
        if(err) throw err;

        res.send('Success')
    })
});

router.delete('/', (req, res) => {
    Incomes.findByIdAndRemove(req.body.id, (err) => {
        if(err) res.send(err);

        res.send("Success");
    });
});

module.exports = router;