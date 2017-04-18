const jsonfile = require('jsonfile');
const logIn = require('siding-navigator');
const utils = require('./libs/utils');
const YearSelect = require('./libs/YearSelect');
const YearCatalogue = require('./libs/YearCatalogue');

const delay = process.env.DELAY_MS || 3000;
const username = process.env.SIDING_USERNAME;
const password = process.env.SIDING_PASSWORD;

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
        const dir = './data.json';
        jsonfile.writeFileSync(dir, flatCourses);
        console.log('Results stored in data.json');
      });
    }, delay * (yearSelect.urls.length + 1))
  });
});
