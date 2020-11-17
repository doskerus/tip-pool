let billAmtInput = document.getElementById('billAmt');
let tipAmtInput = document.getElementById('tipAmt');
let paymentTbody = document.querySelector('#paymentTable tbody');
let summaryTds = document.querySelectorAll('#summaryTable tbody tr td');
let allPayments = {};
let paymentId = 0;

// add a curPayment object to allPayments, update html and reset input values
function submitPaymentInfo(event) {
	if (event) event.preventDefault(); // when running tests there is no event

	let curPayment = createCurPayment();

	if (curPayment) {
		paymentId++;
		allPayments['payment' + paymentId] = curPayment;

		appendPaymentTable(curPayment);
		updateServerTable();
		updateSummary();

		billAmtInput.value = '';
		tipAmtInput.value = '';
	}
}

// createCurPayment() will return undefined with negative or empty inputs
// positive billAmt is required but tip can be 0
function createCurPayment() {
	let billAmt = billAmtInput.value;
	let tipAmt = tipAmtInput.value;

	if (billAmt === '' || tipAmt === '') return;

	if (Number(billAmt) > 0 && Number(tipAmt) >= 0) {
		return {
			billAmt: +billAmt,
			tipAmt: +tipAmt,
			tipPercent: +calculateTipPercent(billAmt, tipAmt),
		}
	}
}

// create table row element and pass to appendTd with input value
function appendPaymentTable(curPayment) {
	let newTr = document.createElement('tr');
	newTr.id = 'payment' + paymentId;

	appendTd(newTr, '$' + curPayment.billAmt);
	appendTd(newTr, '$' + curPayment.tipAmt);
	appendTd(newTr, curPayment.tipPercent + '%');
	appendDeleteBtn(newTr);

	paymentTbody.append(newTr);
}

// create table row element and pass to appendTd with calculated sum of all payment
function updateSummary() {
	if (sumPaymentTotal('billAmt') !== 0) {
		let tipPercentAvg = sumPaymentTotal('tipAmt') * 100 / sumPaymentTotal('billAmt');

		summaryTds[0].innerHTML = '$' + sumPaymentTotal('billAmt');
		summaryTds[1].innerHTML = '$' + sumPaymentTotal('tipAmt');
		summaryTds[2].innerHTML = tipPercentAvg.toFixed(2) + '%';

	} else {
		summaryTds[0].innerHTML = '';
		summaryTds[1].innerHTML = '';
		summaryTds[2].innerHTML = '';
	}
}

// init
let paymentForm = document.getElementById('paymentForm');
paymentForm.addEventListener('submit', submitPaymentInfo);
