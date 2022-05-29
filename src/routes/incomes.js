const IncomesService = require('../controllers/incomes.controller');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const { checkSchema, validationResult } = require('express-validator');

router.use(bodyParser.json());

router.get('/setup', async (req, res) => {
    try {
        const response = await IncomesService.setupIncomes(req, res);
        res.send(response);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const response = await IncomesService.getIncomes(req, res);
        res.send(response);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

router.get('/id/:value', checkSchema({
    id: {
        in: ['params'],
        errorMessage: 'Missing id',
        // isString: true
    }
}), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).send({ errors: errors.array() });

    try {
        const response = await IncomesService.getIncomeById(req, res)
        res.send(response);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

router.post('/', checkSchema({
    name: {
        in: ['body'],
        errorMessage: 'Missing name',
        isString: true
    }
}), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).send({ errors: errors.array() });

    try {
        const response = await IncomesService.addIncome(req, res);
        res.send(response);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
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
}), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).send({ errors: errors.array() });

    try {
        const response = await IncomesService.editIncomes(req, res);
        res.send(response);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

router.delete('/', checkSchema({
    id: {
        in: ['body'],
        errorMessage: 'Missing id',
        // isString: true
    }
}), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).send({ errors: errors.array() });

    try {
        const response = await IncomesService.removeIncome(req, res);
        return res.send(response)
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;