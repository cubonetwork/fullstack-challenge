const chai = require('chai');
const expect = chai.expect;
const winston = require('winston');

describe('Utils - Logger', () => {

    it('Should be an instance of winston', () => {
        let logger = require('../../app/utils/logger');
        expect(logger).to.be.instanceOf(winston.Logger, logger);
    });

});