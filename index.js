const jsonfile = require('jsonfile');
const logIn = require('siding-navigator');
const utils = require('./libs/utils');
const YearSelect = require('./libs/YearSelect');
const YearCatalogue = require('./libs/YearCatalogue');

function scrap(username, password, delay, dir) {
  delay = delay || 3000;
  dir = dir || './data.json';

  return new Promise((resolve, reject) => {
    logIn(username, password).then(navigator => {
      navigator.visit(utils.catalogueIndexUrl).then(res => {
        const catalogues = [];
        const yearSelect = new YearSelect(res.body);
        yearSelect.urls.forEach((url, index) => {
          setTimeout(() => catalogues.push(new YearCatalogue(navigator, url)), delay * index);
        });

        setTimeout(() => {
          Promise.all(catalogues).then(courses => {
            const flatCourses = [].concat(...courses);
            jsonfile.writeFileSync(dir, flatCourses);
            console.log('Results stored in data.json');
            resolve();
          });
        }, delay * (yearSelect.urls.length + 1));
      });
    }).catch(err => {
      reject(err);
    });
  });
}

module.exports = scrap;
