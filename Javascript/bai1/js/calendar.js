window.onload = function() {
	var abc = document.getElementById("abc");
	var inputCalendar = document.getElementById("inputCalendar");
	var testMonth;
	var testYear;
};

//get current date


var dayCurrent = new Date();
var d = new Date(); // use for get month,year
var month = d.getMonth();
var year = d.getFullYear();

var monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July',  'August', 'September', 'October', 'November', 'December'];

var dayName = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

var table = [];

//get day name

function createDayName() {
	table.push('<tr>');
	for(i = 0; i < 7; i++) {
		table.push('<td class="date_name">' + dayName[i] + '</td>');
	}
	table.push('</tr>');

}

//get date form
function getDate(date) {
	inputCalendar.value = date + "/" + (month + 1) + "/" + year;
	abc.style.display = 'none';
}

//next month
function nextMonth() {
	abc.style.display = 'none';
	month++;
	if (month > 11) {
		month = 0;
		year++;
	}
	testMonth.value = month;
	show();
}

//back month
function preMonth() {
	abc.style.display = 'none';
	month--;
	if (month < 0) {
		month = 11;
		year--;
	}
	show();
}

//next year
function nextYear() {
	abc.style.display = 'none';
	year++;
	show();
}

//back year
function preYear() {
	abc.style.display = 'none';
	year--;
	show();
}

//change month calendar in dropdown list

function changeMonth() {
	month = parseInt(document.getElementById("testMonth").value);
	show();
}

//change year calendar in dropdown list

function changeYear() {
	year = parseInt(document.getElementById("testYear").value);
	show();
}

//create function pre, next year ; pre,next month
function createControl() {

	table.push('<tr> <td> <button onclick="preYear()"> << </button> </td>');
	table.push('<td> <button onclick="preMonth()"> < </button> </td>');

	table.push('<td colspan = "2"> <select id ="testMonth" onchange="changeMonth()">');

	for (var i = 0; i < 12; i++) {
		table.push("<option value='" + i + "'>" + monthName[i] + "</option>");
	}

	table.push("</select>");
	table.push('</td>');

	table.push('<td> <select id = "testYear" onchange="changeYear()">');

	for (var i = 0; i < 200; i++) {
		table.push("<option value='" + (i + 1900) + "'>" + (i + 1900) + "</option>");
	}

	table.push("</select>");
	table.push('</td>');

	table.push('<td><button onclick="nextMonth()"> > </button></td>');
	table.push('<td><button onclick="nextYear()"> >> </button></td></tr>');
}

function show() {
	abc.style.display = 'block';
	var d = new Date(year, month);

	table.push('<table class="t_calendar">');

	createControl();

	createDayName();

	//set cell
	for (i = 0; i < d.getDay(); i++) {
		table.push('<td></td>');
	}

	//set date
	while(d.getMonth() == month) {
		
		if(d.getDate() == dayCurrent.getDate() && month == dayCurrent.getMonth() && year == dayCurrent.getFullYear()) {
			table.push('<td class= "date"  onclick="getDate(' + d.getDate() + ')">' + d.getDate() + '</td>');
		} else {

			table.push('<td class= "date"  onclick="getDate(' + d.getDate() + ')">' + d.getDate() + '</td>');
		}
		
		if (d.getDay() % 7 == 6) { 
			table.push('</tr><tr>');
		}
		
		d.setDate(d.getDate() + 1) ;
	}

	for (i = d.getDay(); i < 7; i++) {
			table.push('<td class= "date"></td>');
	}

	table.push('</tr></table>');
	abc.innerHTML = table.join('\n');
	table = [];

	document.getElementById("testMonth").value = month;
	document.getElementById("testYear").value = year;
}

