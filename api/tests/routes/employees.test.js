const chai = require('chai');
chai.use(require('chai-http'));

describe('Routes - Employees', () => {

    process.env.PORT = 6666;
    let server = require('../../app.js');

    beforeEach((done) => {
        // cleaning database before each test
        server.infra.database.sequelize
            .sync({ force: true})
            .then(() => {
                done();
            }).catch(error => {
                done(error);
            });
    });

    describe('POST /employees', () => { 
        it('Should return a HTTP Status 400 when try to add an employee without `nome`', (done) => {
            chai.request(server)
                .post('/employees')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send({'sobrenome': 'Something', 'participacao': 10})
                .end((error, response) => {
                    chai.expect(response.status).to.equal(400);
                    chai.expect(response.body).to.be.an('array');
                    chai.expect(response.body).to.deep.include({
                        'location': 'params',
                        'param': 'nome',
                        'msg': 'Nome é obrigatório e deve possuir no máximo 20 caracteres.'
                    });
                    done();
                });
        });

        it('Should return a HTTP Status 400 when try to add an employee with `nome` greater than 20 caracters', (done) => {
            chai.request(server)
                .post('/employees')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send({'nome': 'Something greater than 20 caracters', 'sobrenome': 'Something', 'participacao': 10})
                .end((error, response) => {
                    chai.expect(response.status).to.equal(400);
                    chai.expect(response.body).to.be.an('array');
                    chai.expect(response.body).to.deep.include({
                        'location': 'body',
                        'param': 'nome',
                        'msg': 'Nome é obrigatório e deve possuir no máximo 20 caracteres.',
                        'value': 'Something greater than 20 caracters'
                    });
                    done();
                });
        });

        it('Should return a HTTP Status 400 when try to add an employee without `sobrenome`', (done) => {
            chai.request(server)
                .post('/employees')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send({'nome': 'Something', 'participacao': 10})
                .end((error, response) => {
                    chai.expect(response.status).to.equal(400);
                    chai.expect(response.body).to.be.an('array');
                    chai.expect(response.body).to.deep.include({
                        'location': 'params',
                        'param': 'sobrenome',
                        'msg': 'Sobrenome é obrigatório e deve possuir no máximo 20 caracteres.'
                    });
                    done();
                });
        });

        it('Should return a HTTP Status 400 when try to add an employee with `sobrenome` greater than 20 caracters', (done) => {
            chai.request(server)
                .post('/employees')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send({'nome': 'Something', 'sobrenome': 'Something greater than 20 caracters', 'participacao': 10})
                .end((error, response) => {
                    chai.expect(response.status).to.equal(400);
                    chai.expect(response.body).to.be.an('array');
                    chai.expect(response.body).to.deep.include({
                        'location': 'body',
                        'param': 'sobrenome',
                        'msg': 'Sobrenome é obrigatório e deve possuir no máximo 20 caracteres.',
                        'value': 'Something greater than 20 caracters'
                    });
                    done();
                });
        });

        it('Should return a HTTP Status 400 when try to add an employee without `participacao`', (done) => {
            chai.request(server)
                .post('/employees')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send({'nome': 'Something', 'sobrenome': 'Something'})
                .end((error, response) => {
                    chai.expect(response.status).to.equal(400);
                    chai.expect(response.body).to.be.an('array');
                    chai.expect(response.body).to.deep.include({
                        'location': 'params',
                        'param': 'participacao',
                        'msg': 'Participação dever ser um número (%) entre 0 e 100.'
                    });
                    done();
                });
        });

        it('Should return a HTTP Status 400 when try to add an employee without `participacao` greater than 100', (done) => {
            chai.request(server)
                .post('/employees')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send({'nome': 'Something', 'sobrenome': 'Something', 'participacao': 101})
                .end((error, response) => {
                    chai.expect(response.status).to.equal(400);
                    chai.expect(response.body).to.be.an('array');
                    chai.expect(response.body).to.deep.include({
                        'location': 'body',
                        'param': 'participacao',
                        'msg': 'Participação dever ser um número (%) entre 0 e 100.',
                        'value': 101
                    });
                    done();
                });
        });

        it('Should return a HTTP Status 400 when try to add an employee without `participacao` less than 0', (done) => {
            chai.request(server)
                .post('/employees')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send({'nome': 'Something', 'sobrenome': 'Something', 'participacao': -1})
                .end((error, response) => {
                    chai.expect(response.status).to.equal(400);
                    chai.expect(response.body).to.be.an('array');
                    chai.expect(response.body).to.deep.include({
                        'location': 'body',
                        'param': 'participacao',
                        'msg': 'Participação dever ser um número (%) entre 0 e 100.',
                        'value': -1
                    });
                    done();
                });
        });

        it('Should return a HTTP Status 201 (Created) when add an employee without errors', (done) => {
            chai.request(server)
                .post('/employees')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send({'nome': 'Something', 'sobrenome': 'Something', 'participacao': 10})
                .end((error, response) => {
                    chai.expect(response.status).to.equal(201);
                    done();
                });
        });

        it('Should return a HTTP Status 205 (Reset Content) when try to add an employee and the `participacao` sum is greater than 100', (done) => {
            server.infra.database.models.Employee
                .build({ nome: 'First', sobrenome: 'Sobrenome', participacao: 100 })
                .save()
                .then(employee => {
                    chai.request(server)
                        .post('/employees')
                        .set('Accept', 'application/json')
                        .set('Content-Type', 'application/json')
                        .send({'nome': 'Something', 'sobrenome': 'Something', 'participacao': 10})
                        .end((error, response) => {
                            chai.expect(response.status).to.equal(205);
                            done();
                        });
                }).catch(error => {
                    done(error);
                });
        });
    });

    describe('GET /employees', () => {
        it('Should return a HTTP Status 200 and an empty array on GET /employees', (done) => {
            chai.request(server)
                .get('/employees')
                .end((error, response) => {
                    chai.expect(response.status).to.equal(200);
                    chai.expect(response.body).to.be.an('array'); 
                    chai.expect(response.body).to.be.empty; 
                    done();
                });
        });

        it('Should return a json with all registered employees on GET /employees', (done) => {
            server.infra.database.models.Employee.bulkCreate([
                { nome: 'First', sobrenome: 'Sobrenome', participacao: 50 },
                { nome: 'Second', sobrenome: 'Sobrenome', participacao: 50 }
            ]).then(users => {
                chai.request(server)
                    .get('/employees')
                    .end((error, response) => {
                        chai.expect(response.status).to.equal(200);
                        chai.expect(response.body).to.be.an('array'); 
                        chai.expect(response.body).to.have.lengthOf(2); 
                        done();
                    });
            }).catch(error => {
                done(error);
            });

        });
    });

});