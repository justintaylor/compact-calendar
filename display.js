var dateFormat = 'MM/DD/YYYY',
  nextYear = year + 1;

function display() {
    var week,
      index = 0,
      output = '',
      dayOfYear = 0,
      date = 0,
      borderType = '',
      borders = false,
      weekDay = 0,
      currentDate = moment().millisecond(0).second(0).minute(0).hour(0),
      startDate = moment(currentDate).date(1),
      endDate = moment(startDate).add(1, 'y'),
      dayOfYearOffset = startDate.dayOfYear();

    // generate an array starting with the first of the current month through the next year
    var dates = [ {date: moment(startDate), desc: '', class: ''} ];
    for(i = 1; moment(dates[dates.length-1].date).add(1, 'd').isBefore(endDate, 'day'); i++) {
  // TODO: what about adding border information here???
        dates.push({date: moment(startDate).add(i, 'd'), desc: '', class: ''});
    }

    // loop through the activities and add their info to the dates array
    for (i = 0; i < activities.length; i++) {
        activities[i].date = moment(activities[i].date, dateFormat);

        // add a second iteration of holidays and birthdays
        if (activities[i].holiday || activities[i].birth) {
            addSecondIteration(i);
        }

        // determine if activity is in the past or too far in the future, and skip it
        if(activities[i].date.isBefore(startDate, 'day') || activities[i].date.isAfter(endDate, 'day')) {
            continue;
        }

        // tweak offset based on activity year
        if (activities[i].date.year() === year) {
            dayOfYear = activities[i].date.dayOfYear() - dayOfYearOffset;
        } else {
            dayOfYear = activities[i].date.dayOfYear() - dayOfYearOffset + 365;
        }

        // determine what to do with the activity (style is determined by css)
        if (activities[i].holiday) {
            dates[dayOfYear].class = 'holiday';
        } else if (activities[i].birth) {
            dates[dayOfYear].class = 'birthday';
        } else if (activities[i].days > 0) { // underline the multi-day occurrances
            dates[dayOfYear].class = 'multiDay';

            // through the end date
            for (b = 0; b < activities[i].days; b++) {
                dates[dayOfYear + b].class = 'multiDay';
            }
        }

        // show the end day for multi-day activities
        if (activities[i].days > 0) {
            var end = moment(activities[i].date).add(activities[i].days - 1, 'd').format("ddd");
            dates[dayOfYear].desc += '<span class="bold">' + activities[i].date.format("ddd") + " to " + end + "</span>: " + activities[i].desc + "; ";
        } else {
            dates[dayOfYear].desc += '<span class="bold">' + activities[i].date.format("ddd") + "</span>: " + activities[i].desc + "; ";
        }
    }

    // OUTPUT

    // show month name
    //output = "<td class='monthNoBorder'><strong>" + currentDate.format('MMM') + '</strong></td>';

    // empty cells leading up to the first
    for (i = 0; i < dates[0].date.weekday(); i++) {
        output += '<td></td>';
    }

    // output the dates array adding additional formatting as needed
    var monthsOutput = 0, desc = '';
    for (i = 0; i < dates.length; i++) {
        weekDay = dates[i].date.weekday();

        // if the start of a week
        if (weekDay === 0) {
            // check to see how many month's we've output (this won't show Jan of next year after Dec)
            // check to see if today is the first of the month
            // check to see if next month is show in this week
            if (monthsOutput <= 11 && (dates[i].date.date() === 1 || moment(dates[i].date).add(6, 'days').month() !== dates[i].date.month())) {
                if (dates[i].date.date() === 1) {
                    output += "<td class='monthNoBorder'><strong>" + moment(dates[i].date).add(6, 'days').format('MMM') + '</strong></td>';
                } else {
                    output += "<td class='month'><strong>" + moment(dates[i].date).add(6, 'days').format('MMM') + '</strong></td>';
                }
                borders = true;
                monthsOutput++;
            } else {
                output += "<td class='emptyMonth'></td>";
                borders = false;
            }
        } else if (weekDay === 0 && borders === true) {
            borders = false;
        }

        // date info
        date = dates[i].date.date();
        if(borders) {
            if (date >= 22 && date <= 31) {
                borderType = 'borderBottom';
            } else if (date == 1) {
                if (weekDay ===0) {
                    borderType = 'borderTop';
                } else {
                    borderType = 'borderTop borderLeft';
                }
            } else if (date >= 1 && date <= 7) {
                borderType = 'borderTop';
            } else {
                console.error("Unhandled date");
            }
        } else {
            borderType = '';
        }
        output += '<td class="' + borderType + " " + dates[i].class + '">' + date + '</td>';

        // show any info for these days
        if(dates[i].desc) {
            desc += dates[i].desc + ' ';
        }

        // if end of the week
        if (weekDay === 6) {
            // remove last '; '
            desc = desc.substr(0, desc.length -3);

            output += '<td class="events">' + desc + '</td></tr>';
            desc = '';
        }
    }

    document.getElementById('calendarNew').innerHTML = output;
}

function addSecondIteration(m) {
    // add a second iteration (the following year), for the specified activity
    var next = new Object({});
    next.desc = activities[m].desc;
    next.date = moment(activities[m].date).add(1, 'y');

    // verify second iteration hasn't already been created
    if (next.date.year() > nextYear) {
        return;
    }

    // change to string
    next.date = next.date.format(dateFormat);

    if (activities[m].holiday) {
        next.holiday = true;
    }

    if (activities[m].birth) {
        next.birth = activities[m].birth;
    }

    activities.push(next);
}
