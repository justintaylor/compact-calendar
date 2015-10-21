
var currentDate, week, index = 0;
var dateFormat = 'MM/DD/YYYY';

function display() {
    var output = '',
        nextYear = year + 1,
        dayOfYear = 0,
        date = 0,
        borderType = '',
        borders = false,
        weekDay = 0;
    currentDate = moment('01/01/' + year, dateFormat);

    // generate an array of all days of the year
    var dates = [ {date: moment(currentDate), desc: '', class: ''} ];
    for(i = 1; moment(dates[dates.length-1].date).add(1, 'd').year() !== nextYear; i++) {
  // TODO: what about adding border information here???
        dates.push({date: moment(currentDate).add(i, 'd'), desc: '', class: ''});
    }

    // loop through the activities and add their info to the dates array
    for (i = 0; i < activities.length; i++) {
        activities[i].date = moment(activities[i].date, dateFormat);

        dayOfYear = activities[i].date.dayOfYear() -1;

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
    output = "<td class='monthNoBorder'><strong>" + currentDate.format('MMM') + '</strong></td>';

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
            if (monthsOutput <= 10 && (dates[i].date.date() === 1 || moment(dates[i].date).add(6, 'days').month() !== dates[i].date.month())) {
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
