
// current year
var year = moment().year();

var activities = [
    // format example
    //{ date: <date of activity>, desc: <activity information>, <birth year (optional)> }

    // Dad's holidays at work

    // activities
    {date: "05/28/2015",  desc: "Canoe Trip", days: 3},
    {date: "05/30/2015",  desc: "Swim Clinic"},
    {date: "06/04/2015",  desc: "Day Camp", days: 3},
    {date: "06/26/2015",  desc: "Gma & Gpa Here", days: 3},
    {date: "07/18/2015",  desc: "Trip to ID", days: 15},
    {date: "07/28/2015",  desc: "Pack Swim Party"},

	{date: "09/25/2015",  desc: "Campout", days: 2},
	{date: "10/09/2015",  desc: "Hunt", days: 7},



    // holidays - just a few
    {date: '01/01/' + year, desc: 'New Year\'s', holiday: true},
    {date: '07/04/' + year, desc: 'Independence Day', holiday: true},
    {date: '10/31/' + year, desc: 'Halloween', holiday: true},
	{date: '12/25/' + year, desc: 'Christmas', holiday: true},



	// Relatives birthdays
	{date: "02/15/" + year, desc: "Gma", birth: 1932},
    {date: "08/09/" + year, desc: "Gpa", birth: 1934},

    {date: "04/17/" + year, desc: "Dad", birth: 1978},
    {date: "06/26/" + year, desc: "Mom", birth: 1981},

    {date: "02/22/" + year, desc: "Brother", birth: 1983},
    {date: "02/01/" + year, desc: "Sister", birth: 1988},

	{date: "11/02/" + year,  desc: "Kid 1", birth: 2003},
	{date: "08/12/" + year,  desc: "Kid 2", birth: 2005}
];
