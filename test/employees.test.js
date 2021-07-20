const mongoose = require('mongoose');
const { connect, clearDatabase, closeDatabase } = require('./db-handler');

const employeeControl = require('../controllers/employeeControl');
const employeeModel = require('../models/employeeModel');

beforeAll(async () => await connect());

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());


describe('create employee', () => {
    it('should return a post with id', done => {
        expect(async () => await employeeControl.create(employeeData)).not.toThrow();
        done();
    });

    // it('exists after being created', async done => {
    //      await employeeControl.create(employeeData);
    //     const createdEmployee = await employeeModel.findById(res);
    //     expect({res}).toBe(employeeData.name);
    //     done();
    // })

    const employeeData = {
        name: {
            first: "Bill",
            last: "Doe"
        },
        sex: "male",
        birthday: "1990-30-12"

    }
});
