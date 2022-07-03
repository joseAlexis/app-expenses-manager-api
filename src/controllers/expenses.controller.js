const Expenses = require('../models/expenses.model');
const logger = require('../utils/logger');

module.exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expenses.find({});
        return expenses;
    } catch (err) {
        logger.error(err);
        return res.status(500).send(err);
    }
}

module.exports.getExpenseById = async (req, res) => {
    try {
        const expense = await Expenses.findById({ _id: req.params.value });
        if(!expense)
            return res.status(400).send("Element not found");
            
        return expense;
    } catch (err) {
        logger.error(err);
        return res.status(500).send(err);
    }
}

module.exports.setupExpenses = async (req, res) => {
    const expensesList = [
        {
            name: 'Supermarket',
            budget: 0
        },
        {
            name: 'Restaurants',
            budget: 0
        },
        {
            name: 'Transportation',
            budget: 0
        }
    ];

    try {
        const expenses = await Expenses.create(expensesList);
        return expenses;
    } catch (err) {
        logger.error(err);
        return res.status(500).send(err);
    }
}

module.exports.addExpense = async (req, res) => {
    try {
        const newExpense = Expenses({
            name: req.body.name
        });

        return await newExpense.save();
    } catch (err) {
        logger.error(err);
        return res.status(500).send(err);
    }
}

module.exports.editExpense = async (req, res) => {
    try {
        const expense = await Expenses.findById({ _id: req.body.id })
        if (!expense) {
            return res.sendStatus(404);
        }

        const modifiedExpense = {
            name: req.body.name,
            budget: req.body.budget
        }

        return await Expenses.findByIdAndUpdate(req.body.id, modifiedExpense, { new: true });
    } catch (err) {
        logger.error(err);
        return res.status(500).send(err);
    }
}

module.exports.removeExpense = async (req, res) => {
    try {
        const expense = await Expenses.findById({ _id: req.body.id })
        if (!expense) {
            return res.sendStatus(404);
        }

        await Expenses.findByIdAndRemove(req.body.id, { returnDocument: true });
    } catch (err) {
        logger.error(err);
        return res.status(500).send(err);
    }
}