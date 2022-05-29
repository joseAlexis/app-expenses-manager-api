const mongoose = require('mongoose');
const logger = require('./logger');
require('dotenv').config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

module.exports.connect = async () => {
    try {
        await mongoose.connect(url, connectionParams);
        logger.info("Connected to the database!")
    } catch (err) {
        logger.error();(`Cannot connect to the db.\nError:\n${err}`);
        process.exit(1);
    }
}