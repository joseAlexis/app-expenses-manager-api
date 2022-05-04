const Incomes = require('../models/Incomes');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const { checkSchema, validationResult } = require('express-validator');

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

router.get('/id/:value', checkSchema({
    id: {
        in: ['params'],
        errorMessage: 'Missing id',
        isString: true
    }
}), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).send({ errors: errors.array() });

    Incomes.findById({ _id: req.params.value }, (err, expense) => {
        if (err) throw err;

        res.send(expense);
    });
});

router.post('/', checkSchema({
    name: {
        in: ['body'],
        errorMessage: 'Missing name',
        isString: true
    }
}), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).send({ errors: errors.array() });

    let newExpense = Incomes({
        name: req.body.name
    });

    newExpense.save((err) => {
        if (err) throw err;

        res.send('Success')
    });
});

router.put('/', checkSchema({
    id: {
        in: ['body'],
        errorMessage: 'Missing id',
        isString: true
    },
    name: {
        in: ['body'],
        errorMessage: 'Missing name',
        isString: true
    }
}), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).send({ errors: errors.array() });

    Incomes.findByIdAndUpdate(req.body.id, {
        name: req.body.name
    }, (err) => {
        if (err) throw err;

        res.send('Success')
    })
});

router.delete('/', checkSchema({
    id: {
        in: ['body'],
        errorMessage: 'Missing id',
        isString: true
    }
}), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).send({ errors: errors.array() });

    Incomes.findByIdAndRemove(req.body.id, (err) => {
        if (err) res.send(err);

        res.send("Success");
    });
});

module.exports = router;