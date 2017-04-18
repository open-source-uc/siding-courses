const utils = require('./utils');
const cheerio = require('cheerio');

class YearSelect {
  constructor(body) {
    this.setJsonUrls(body);
  }

  setJsonUrls(body) {
    const $ = cheerio.load(body);
    this.urls = $(utils.yearsSelector).map((i, option) => {
      return utils.baseUrl + $(option).val();
    }).get();
  }
}

module.exports = YearSelect;
