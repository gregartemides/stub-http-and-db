const {
  fetchCurrencies,
  convertXMLToJson,
  parseJson,
  save,
} = require('./lib/helper');

fetchCurrencies()
  .then(convertXMLToJson)
  .then(parseJson)
  .then(save)
  .then(doc => console.log(doc))
  .catch(error => console.log(error))
  .then(() => process.exit());
