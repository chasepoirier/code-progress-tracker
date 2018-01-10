let counter = document.querySelector('.counter span');
let hours = document.querySelector('.hours span');
let btn = document.querySelector('.btn');
let input = document.querySelector('.input');

btn.addEventListener('click', function(e) {
	e.preventDefault()
	
	
	let updatedHours = convertToNumAndAdd(hours.innerHTML, input.value);
	storeItem('hours', updatedHours);
	hours.innerHTML = updatedHours;
});

document.addEventListener('DOMContentLoaded', function(e) {
	if(localStorage.getItem('hours') === null) {
		localStorage.setItem('hours', 0)
	}

	if(localStorage.getItem('count') === null) {
		localStorage.setItem('count', 1)
	}
		
	countDays();
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

function storeItem(item, val) {
	localStorage.setItem(item, val);
}

function getStoredItem(item) {
	let value;
	value = localStorage.getItem(item);
	return value;
}

function countDays() {
	let count = parseInt(getStoredItem('count'));
	setInterval(() => {
		storeItem('count', count += 1)
		counter.innerHTML = count += 1;
	}, 86400000)
}

//86400000