const express = require("express");
const config = require('./config');

const expensesRouter = require('./routes/expenses');
const incomesRouter = require('./routes/incomes');

const app = express();

const port = process.env.port || 3000;
app.use("/assets", express.static(`${__dirname}/public`));

app.use("/api/incomes", incomesRouter);
app.use("/api/expenses", expensesRouter);

config.connect();
app.listen(port);

module.exports = app;