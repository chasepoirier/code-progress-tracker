let counter = document.querySelector('.counter span');
let hours = document.querySelector('.hours span');
let addBtn = document.querySelector('.add-container .btn');
let addInput = document.querySelector('.add-container .input');
let subBtn = document.querySelector('.sub-container .btn');
let subInput = document.querySelector('.sub-container .input');

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

document.addEventListener('DOMContentLoaded', function(e) {
	if(localStorage.getItem('hours') === null) {
		localStorage.setItem('hours', 0)
	}

	if(localStorage.getItem('count') === null) {
		localStorage.setItem('count', 1)
	}
	
	setInterval(() => countDays(), 100)	
	
	let updateCounter = getStoredItem('count');
	let updatedHours = getStoredItem('hours');
	hours.innerHTML = updatedHours;
	counter.innerHTML = updateCounter;
});

function convertToNumAndAdd(current, value) {
	let currentToNum = parseFloat(current);
	let valueToNum = parseFloat(value);

	return Math.round((currentToNum + valueToNum)*100) / 100;
}

function convertToNumAndSub(current, value) {
	let currentToNum = parseFloat(current);
	let valueToNum = parseFloat(value);

	return Math.round((currentToNum - valueToNum)*100) / 100;
}

function storeItem(item, val) {
	localStorage.setItem(item, val);
}

function getStoredItem(item) {
	let value;
	value = localStorage.getItem(item);
	return value;
}

function countDays() {

	let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
	let hours = 24*60*60;
	let startDay = new Date(2018,00,10);
	let currentTime = Date.now();

	let diffDays = Math.abs((currentTime - startDay.getTime()) / oneDay) + 1;

	counter.innerHTML = diffDays.toFixed(6);
}