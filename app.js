let counter = document.querySelector('.counter span');
let hours = document.querySelector('.hours span');

let addBtn = document.querySelector('.add-container .btn');
let addInput = document.querySelector('.add-container .input');

let subBtn = document.querySelector('.sub-container .btn');
let subInput = document.querySelector('.sub-container .input');

let settingsBtn = document.querySelector('.settings-btn');
let settingsCloseBtn = document.querySelector('.settings .close');

let changeDateBtn = document.querySelector('.settings .btn');
let dateInput = document.querySelector('.settings .input');

let sessionBtn = document.querySelector('.session-container .btn');
let sessionInput = document.querySelector('.session-container .input');

let startSession;


/*
|-------------------------------------------------------
| Functions for Initial Load of DOM
|-------------------------------------------------------
| Continuously count days and do specific functions
| based on the start of localStorage.
|
*/

document.addEventListener('DOMContentLoaded', function(e) {
	changeDateBtn.parentNode.style.display = 'none';

	if(localStorage.getItem('hours') === null) {
		localStorage.setItem('hours', 0)
	}

	if(localStorage.getItem('start-date') === null) {
		changeDateBtn.parentNode.style.display = 'flex';
		settingsBtn.style.display = 'none';
	}

	if(localStorage.getItem('current-session') !== null) {
		let startTime = getStoredItem('current-session');

		startSession = setInterval(() => countHours(startTime), 100);
		sessionBtn.value = 'End Session';
	}
	
	setInterval(() => countDays(), 100)	
	
	let updatedHours = getStoredItem('hours');
	hours.innerHTML = updatedHours;
});



/*
|-------------------------------------------------------
| Button Listener Events
|-------------------------------------------------------
| Event listeners for each button in the application.
| Each event has a unique set of functionality
|
*/

sessionBtn.addEventListener('click', function(e) {	
	if(sessionBtn.value === 'Start Session') {
		let startTime = Date.now()

		storeItem('current-session', startTime);
		startSession = setInterval(() => countHours(startTime), 100);
		sessionBtn.value = 'End Session';
	} else {
		sessionBtn.value = 'Start Session';
		let updatedHours = convertToNumAndAdd(hours.innerHTML, sessionInput.value);
		localStorage.removeItem('current-session');
		storeItem('hours', updatedHours);
		hours.innerHTML = updatedHours;
		sessionInput.value = '';
		clearInterval(startSession)
	}
});

addBtn.addEventListener('click', function(e) {
	e.preventDefault();
	if(addInput.value) {
		let updatedHours = convertToNumAndAdd(hours.innerHTML, addInput.value);
		storeItem('hours', updatedHours);
		hours.innerHTML = updatedHours;
		addInput.value = '';
	}
});

subBtn.addEventListener('click', function(e) {
	e.preventDefault();
	if(subInput.value) {
		let updatedHours = convertToNumAndSub(hours.innerHTML, subInput.value);
		storeItem('hours', updatedHours);
		hours.innerHTML = updatedHours;
		subInput.value = '';
	}
});

changeDateBtn.addEventListener('click', function(e) {
	e.preventDefault()
	if(dateInput.value) {
		let dateVal = dateInput.value.replace(/-/g, '/');
		storeItem('start-date', dateVal);
		changeDateBtn.parentNode.style.display = 'none';
		settingsBtn.style.display = 'block';
	}
});

settingsBtn.addEventListener('click', function(e) {
	changeDateBtn.parentNode.style.display = 'flex';
	settingsBtn.style.display = 'none';
});

settingsCloseBtn.addEventListener('click', function(e) {
	changeDateBtn.parentNode.style.display = 'none';
	settingsBtn.style.display = 'block';
});





/*
|-------------------------------------------------------
| Functions to convert strings to nums
|-------------------------------------------------------
| Converts user input and either adds or subtracts
| the input compared to the old state.
|
*/

function convertToNumAndAdd(current, value) {
	let currentToNum = parseFloat(current);
	let valueToNum = parseFloat(value);

	return Math.round((currentToNum + valueToNum)*1000) / 1000;
}

function convertToNumAndSub(current, value) {
	let currentToNum = parseFloat(current);
	let valueToNum = parseFloat(value);

	return Math.round((currentToNum - valueToNum)*1000) / 1000;
}


/*
|-------------------------------------------------------
| Get and set local storage
|-------------------------------------------------------
| Functions to set new items or retrieve 
| data in local storage.
|
*/

function storeItem(item, val) {
	localStorage.setItem(item, val);
}

function getStoredItem(item) {
	let value;
	value = localStorage.getItem(item);
	return value;
}



/*
|-------------------------------------------------------
| Count hours and days
|-------------------------------------------------------
| Math functinos to count the amount of hours or
| the amount of days since a set date.
|
*/

function countHours(start) {
	let currentTime = Date.now()
	let hours = Math.abs(parseFloat(start) - currentTime) / 36e5;
	sessionInput.value = hours.toFixed(4);
}

function countDays() {
	
	let startDay = new Date(getStoredItem('start-date'));

	if(startDay) {
		let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
		let currentTime = Date.now();
		let diffDays = Math.abs((currentTime - startDay.getTime()) / oneDay) + 1;
		counter.innerHTML = diffDays.toFixed(6);
	}
}