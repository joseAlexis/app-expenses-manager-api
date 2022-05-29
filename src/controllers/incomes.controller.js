const Incomes = require('../models/incomes.model');
const logger = require('../utils/logger');

module.exports.getIncomes = async (req, res) => {
    try {
        const incomes = await Incomes.find({});
        return incomes;
    } catch (err) {
        logger.error(err);
        return res.status(500).send(err);
    }
}

module.exports.getIncomeById = async (req, res) => {
    try {
        const income = await Incomes.findById({ _id: req.params.value });
        return income;
    } catch (err) {
        logger.error(err);
        return res.status(500).send(err);
    }
}

module.exports.setupIncomes = async (req, res) => {
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

    try {
        const incomes = await Incomes.create(incomesList);
        return incomes;
    } catch (err) {
        logger.error(err);
        return res.status(500).send(err);
    }
}

module.exports.addIncome = async (req, res) => {
    try {
        const newIncome = Incomes({
            name: req.body.name
        });

        return await newIncome.save();
    } catch (err) {
        logger.error(err);
        return res.status(500).send(err);
    }
}

module.exports.editIncomes = async (req, res) => {
    try {
        const income = await Incomes.findById({ _id: req.body.id })
        if (!income) {
            return res.sendStatus(404);
        }

        const modifiedIncome = {
            name: req.body.name,
            budget: req.body.budget
        }

        return await Incomes.findByIdAndUpdate(req.body.id, modifiedIncome, { new: true });
    } catch (err) {
        logger.error(err);
        return res.status(500).send(err);
    }
}

module.exports.removeIncome = async (req, res) => {
    try {
        const income = await Incomes.findById({ _id: req.body.id })
        if (!income) {
            return res.sendStatus(404);
        }

        return await Incomes.findByIdAndRemove(req.body.id, { returnDocument: true });
    } catch (err) {
        logger.error(err);
        return res.status(500).send(err);
    }
}