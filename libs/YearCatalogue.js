const utils = require('./utils');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const Course = require('./Course');

class YearCatalogue {
  constructor(navigator, url) {
    this.courses = [];
    [this.term, this.year] = url.match(/\d{1}\_\d{4}/)[0].split('_');
    this.term = (this.term === '3' ? 'TAV' : this.term);

    console.log(`Scraping ${this.year}-${this.term}`);

    return new Promise((resolve, reject) => {
      navigator.visit(url).then((res) => {
        this.scrap(res, resolve);
      });
    });
  }

  scrap(response, resolve) {
    const body = iconv.decode(new Buffer(response.body), 'ISO-8859-1');
    const $ = cheerio.load(body, { decodeEntities: false });

    $(utils.departmentSelector).get().forEach(department => {
      const initials = this.getDepartmentInitials($, department);
      const departmentName = this.getDepartmentName($, department, initials);
      this.courses = this.courses.concat(...this.buildCourses($, initials, departmentName));
    });

    resolve(this.courses);
  }

  getDepartmentInitials($, department) {
    return $(department).attr('onclick').replace('ShowChildrenElem(\'', '').replace('\')', '');
  }

  getDepartmentName($, departmentNode, initials) {
    let departmentName = `${utils.cleanText($(departmentNode).html())} (${initials})`;
    return departmentName.substring(departmentName.lastIndexOf('>') + 1);
  }

  buildCourses($, initials, departmentName) {
    return $(utils.courseUrlSelector(initials)).get().map(aTag => {
      const name = utils.cleanText($(aTag).html());
      const href = $(aTag).attr('href');
      const course = new Course(name, href, this.year, this.term, departmentName);
      return course.toJSON();
    });
  }
}

module.exports = YearCatalogue;
