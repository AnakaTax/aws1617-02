'use strict';

var chai = require('chai');
chai.use(require('chai-things'));
chai.use(require('chai-http'));
var expect = chai.expect;
var researchers = require('../routes/researchers-service');
var app = require('../server');

describe('Testing Researchers API functionalities', function() {
    beforeEach(function(done) {
        researchers.connectDb((err) => {
            if (err) {
                return done(err);
            }

            researchers.removeAll(function(err) {
                if (err) {
                    return done(err);
                }

                researchers.add([{
                    dni: "11224477Q",
                    name: "Pepe",
                    phone: "654657748",
                    email: "pepe@us.com",
                    address: "Sevilla",
                    gender: "male"
                }, {
                    dni: "22558877V",
                    name: "Anne",
                    phone: "722548896",
                    email: "anne@london.com",
                    address: "London",
                    gender: "female"
                }], done);
            });
        });
    });

    describe('#allResearchers()', function() {
        it('should return all researchers', function(done) {
            researchers.allResearchers((err, res) => {
                if (err) {
                    return done(err);
                }

                expect(res).to.have.lengthOf(2);
                expect(res).to.contain.an.item.with.property('name', 'Pepe');
                expect(res).to.contain.an.item.with.property('name', 'Anne');
                done();
            });
        });
    });

    describe('#get()', function() {
        it('should return one researcher', function(done) {
            researchers.get('11224477Q', (err, res) => {
                if (err) {
                    return done(err);
                }

                expect(res).to.have.lengthOf(1);
                expect(res).to.contain.an.item.with.property('name', 'Pepe');
                done();
            });
        });
    });

    describe('#add()', function() {
        it('should add one more researcher to the default list', function(done) {
            researchers.add([{
                dni: "33554477B",
                name: "Manuel",
                phone: "987654321",
                email: "manuel@us.com",
                address: "Sevilla",
                gender: "male"
            }], (err) => {

                if (err) {
                    return done(err);
                }

                researchers.allResearchers((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res).to.have.lengthOf(3);
                    expect(res).to.contain.an.item.with.property('name', 'Pepe');
                    expect(res).to.contain.an.item.with.property('name', 'Anne');
                    expect(res).to.contain.an.item.with.property('name', 'Manuel');
                    done();
                });
            });
        });
    });

    describe('#removeAll()', function() {
        it('should delete all the researchers', function(done) {
            researchers.removeAll((err) => {
                if (err) {
                    return done(err);
                }

                researchers.allResearchers((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res).to.have.lengthOf(0);
                    done();
                });
            });
        });
    });

    describe('#remove()', function() {
        it('should delete one researcher of the default list', function(done) {
            researchers.remove('11224477Q', (err) => {
                if (err) {
                    return done(err);
                }

                researchers.allResearchers((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res).to.have.lengthOf(1);
                    expect(res).not.to.contain.an.item.with.property('name', 'Pepe');
                    expect(res).to.contain.an.item.with.property('name', 'Anne');
                    done();
                });
            });
        });
    });

    describe('#update()', function() {
        it('should update one researcher of the default list', function(done) {
            researchers.update('11224477Q', {
                dni: "33554477B",
                name: "Manuel",
                phone: "987654321",
                email: "manuel@us.com",
                address: "Sevilla",
                gender: "male"
            }, (err) => {
                if (err) {
                    return done(err);
                }

                researchers.allResearchers((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res).to.have.lengthOf(2);
                    expect(res).to.contain.an.item.with.property('name', 'Manuel');
                    expect(res).to.contain.an.item.with.property('dni', '33554477B');
                    expect(res).to.contain.an.item.with.property('name', 'Anne');
                    done();
                });
            });
        });
    });
    
    describe('HTTP - GET', function() {
       it('should return 200 OK', function(done){
          chai.request(app)
          .get('/api/v1/researchers')
          .end(function(err, res) {
            if (err) {
               return done(err);
            }
            expect(res.body).to.have.lengthOf(2);
            expect(res).to.have.status(200);
            done();
          });
       });
    });
});
