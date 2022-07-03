const supertest = require("supertest");
const app = require('../app');
// const express = require("express");
// const expensesRouter = require("./expenses");
// const request = require("supertest");

// const app = express();
// app.use("/api/expenses", expensesRouter);

// jest.mock(app);


// const db = require("../utils/mongoTestDB");
// const service = require("../../services/expenses.service");

// beforeAll(async () => await db.connect())
// afterEach(async () => await db.clearDatabase())
// afterAll(async () => await db.closeDatabase())

describe("Expenses Unit Test", () => {
    // it("Empty id returns 404", async done => {
    //     const response = await request(app).get("/api/expenses/id/");
    //     expect(response.statusCode).to.eq(404);
    // })
    it("Setup Expenses", async () => {
        await supertest(app).get('/api/expenses/id/6293b12387e7ad68ebf9b47d').expect(400);
        // expect(true).toBe(true);
    });
})