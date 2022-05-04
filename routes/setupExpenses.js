const Expenses = require('../models/Expenses');

module.exports = function (app) {
    app.get('/api/setupExpenses', function (req, res) {
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
}