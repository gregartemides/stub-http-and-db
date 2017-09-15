const Promise = require('bluebird');
const request = require('request-promise');
const xml2json = require('xml2json');
const mongoose = require('mongoose');
const config = require('../lib/config');

const xmlToJson = Promise.method(xml2json.toJson);
const jsonParse = Promise.method(JSON.parse);

module.exports = {

  fetchCurrencies: () => request('http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml'),

  convertXMLToJson: xml => xmlToJson(xml),

  parseJson: json => jsonParse(json),

  save: obj => {
    try {
      mongoose.Promise = Promise;
      mongoose.connect(config.mongoUri, { useMongoClient: true });

      const Currency = mongoose.model('Currency', {
        date: String,
        currencies: mongoose.Schema.Types.Mixed
      }, 'currencies');

      const date = obj['gesmes:Envelope'].Cube.Cube.time;
      const currencies = obj['gesmes:Envelope'].Cube.Cube.Cube;
      
      return Currency.findOneAndUpdate({ date }, { date, currencies }, { upsert: true })

    } catch (e) {
      throw e;
    }
  },

};
