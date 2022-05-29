const express = require("express");
const config = require('./utils');

const expensesRouter = require('./routes/expenses');
const incomesRouter = require('./routes/incomes');
const apiRouter = require('./routes');

const logger = require("./utils/logger");

const app = express();

const port = process.env.port || 3000;
app.use("/assets", express.static(`${__dirname}/public`));

app.use("/api/incomes", incomesRouter);
app.use("/api/expenses", expensesRouter);
app.use("/api", apiRouter);

app.listen(port, async () => {
    logger.info("Application sucessfully started!")
    await config.connect();
});

module.exports = app;