// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects
function sumPaymentTotal(type) {
	let total = 0;

	for (let key in allPayments) {
		let payment = allPayments[key];

		total += Number(payment[type]);
	}

	return total;
}

// converts the bill and tip amount into a tip percent
function calculateTipPercent(billAmt, tipAmt) {
	return (tipAmt * 100 / billAmt).toFixed(2);
}

// expects a table row element, appends a newly created td element from the value
function appendTd(tr, value) {
	let newTd = document.createElement('td');
	newTd.innerText = value;

	tr.append(newTd);
}

function appendDeleteBtn(tr) {
	let newTd = document.createElement('td');
	newTd.innerHTML = '&times;';
	newTd.className = 'deleteBtn';

	tr.append(newTd);
}

function clickDeleteBtn(event) {
	let et = event.target;

	if (et.className === 'deleteBtn') {
		let parentId = et.parentElement.id;
		et.parentElement.remove();

		if (parentId.includes('payment')) {
			delete allPayments[parentId];
			updateServerTable();
			updateSummary();
		} else {
			delete allServers[parentId];
			updateServerTable();
		}
	}
}

// init
let inputSection = document.getElementById('input');
inputSection.addEventListener('click', clickDeleteBtn);
