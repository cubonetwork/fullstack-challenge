/**
 * Tests the Employees Endpoint
 */

process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Employee = require('../api/models/employeesModel');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

const validEmployee = {
    name: 'Test',
    lastName: 'Employee',
    participation: 100
}

const invalidEmployee = {
    name: 'Test',
    lastName: 'Employee'
}

describe('Employees', () => {

    // Remove all the employees to test the routes
    beforeEach((done) => {
        Employee.remove({}, (err) => {
            done();
        });
    });

    /**
     * Test the GET route
     */
    describe('/GET employees', () => {
        it('it should GET all the employees', (done) => {
            chai.request(server)
                .get('/employees')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });

        it('it should GET all the employees', (done) => {
            chai.request(server)
                .post('/employees')
                .send(validEmployee)
                .end((err, res) => {
                    chai.request(server)
                        .get('/employees')
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.have.a('array');
                            res.body.length.should.be.eql(1);
                            done();
                        });
                });
        });
    });

    /**
     * Test the POST route
     */
    describe('/POST employees', () => {
        it('it should not POST an employee without participation field', (done) => {
            chai.request(server)
                .post('/employees')
                .send(invalidEmployee)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('participation');
                    res.body.errors.participation.should.have.property('kind').eql('required');
                    done();
                });
        });

        it('it should POST an employee', (done) => {
            chai.request(server)
                .post('/employees')
                .send(validEmployee)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.name.should.eql('Test');
                    done();
                });
        });

        it('it should not POST an employee because database already have 100% participation', (done) => {
            chai.request(server)
                .post('/employees')
                .send(validEmployee)
                .end((err, res) => {
                    chai.request(server)
                        .post('/employees')
                        .send(validEmployee)
                        .end((err, res) => {
                            res.should.have.status(400);
                            res.body.should.be.a('object');
                            res.body.should.have.property('errors');
                            res.body.errors.should.have.property('field');
                            res.body.errors.field.should.have.property('kind').eql('invalid');
                            done();
                        });
                });

        });
    });
});
