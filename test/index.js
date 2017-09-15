const currencies = require('../lib/helper');
const sinon = require('sinon');
const assert = sinon.assert;

describe('Currencies', () => {

  describe('fetchCurrencies()', () => {

    before(() => {
      sinon
        .stub(currencies, 'fetchCurrencies')
        .resolves('some xml');
    });

    after(() => currencies.fetchCurrencies.restore());

    it('can fetch currencies', () => {
      return currencies.fetchCurrencies()
        .then(body => {
          assert.called(currencies.fetchCurrencies);
          assert.match(body, 'some xml');
        });
    });

    it('can reject with error', () => {
      currencies.fetchCurrencies.rejects();
      return currencies.fetchCurrencies()
        .catch(error => {
          assert.match(error, Error);
        });
    });

  });

  describe('save()', () => {

    before(() => {
      sinon
        .stub(currencies, 'save')
        .resolves({ _id: '59bbb926287ec9855dc3ee2c' });
    });

    after(() => currencies.save.restore());

    it('can save currencies', () => {
      return currencies.save()
        .then(doc => {
          assert.called(currencies.save);
          assert.match(doc, { _id: '59bbb926287ec9855dc3ee2c' });
        });
    });

    it('can reject with error', () => {
      currencies.save.rejects();
      return currencies.save()
        .catch(error => {
          assert.match(error, Error);
        });
    });

  });

});
