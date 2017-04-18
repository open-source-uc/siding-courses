const utils = require('./utils');

class Course {
  constructor(name, href, year, term, departmentName) {
    this.setId(href);
    this.processName(name);
    this.year = year;
    this.term = term;
    this.department = departmentName;
  }

  setId(url) {
    this.id = url.slice(url.indexOf('id_curso_ic')).split('=')[1];
  }

  processName(name) {
    const rawSection = name.match(/s\.\d+/)[0];
    this.section = rawSection.replace('s.', '');
    [this.initials, this.name] = name.split(rawSection).map(text => utils.cleanText(text));
  }

  toJSON() {
    return {
      id: this.id,
      initials: this.initials,
      name: this.name,
      year: this.year,
      term: this.term,
      section: this.section,
      department: this.department
    };
  }
}

module.exports = Course;
