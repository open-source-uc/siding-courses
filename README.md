# SIDING Courses

> Scrap courses from SIDING.

[![npm version](https://badge.fury.io/js/siding-courses.svg)](https://badge.fury.io/js/siding-courses)
[![dependencies](https://david-dm.org/sasalatart/siding-courses.svg)](https://david-dm.org/sasalatart/siding-courses)
[![Code Climate](https://codeclimate.com/github/sasalatart/siding-courses/badges/gpa.svg)](https://codeclimate.com/github/sasalatart/siding-courses)

## Installation

Run `npm i siding-courses`.

## Usage

```js
const sidingScraper = require('siding-courses');

sidingScraper('your-siding-username', 'your-siding-password', msDelay, dir).then(() => {
  // The results have now been saved in your specified dir.
}).catch(err => {
  console.log(err);
});
```

If no `msDelay` between successive term requests is specified, it will default to 3000 (3s).
**It is important to give a delay in order to avoid making too many requests in a very short amount of time.**

If no output dir is specified, it will default to `./data.json`.

Results will have the following structure:

```js
[
  ..., {
    id: 'course-id',
    initials: 'course-initials',
    name: 'course-name',
    year: 'course-year',
    term: 'course-term',
    section: 'course-section',
    department: 'course-department'
  }, ...
]
```

## Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'add my feature'`)
4. Push to your feature branch (`git push origin my-new-feature`)
5. Create a new Pull Request
