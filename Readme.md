# Compact Calendar in JS

Inspired by Dave Seah's [Compact Calendar](http://davidseah.com/node/compact-calendar/)

A full year on a single page with room for event information and even notes

[Live Example](https://output.jsbin.com/visico)

* Add/edit dates in the dates.js file to customize
* Durations, holidays and birthdays can be styled via css however you like

## currentMonthFirst branch
Check this branch out for a calendar format of the current month and the next 11 months instead of the calendar year

[Live Example](https://jsbin.com/deyise)


## Configuration
* Install [npm](http://nodejs.org/download/) (if not already installed)
* Run `npm install` from within the project directory to get the [moment](http://momentjs.com) library
* Open the `index.html` file in your browser, no web server needed

## TODO
- [ ] refactor and add the ability to specify data file with url param (data file will also specify display type)
- [ ] figure out what to do when there is too much info on a line to display it
- [ ] add I18n capabilities (for practice), for Month and Day names
- [ ] add the ability to handle dynamic dates (like Thanksgiving)
- [ ] add [handlebars](https://www.npmjs.com/package/handlebars)
- [x] add links in this readme to live examples on jsbin
