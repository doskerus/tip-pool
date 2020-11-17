describe("Utilities test (with setup and tear-down)", function () {
	beforeEach(function () {
		// initialization logic
		billAmtInput.value = 100;
		tipAmtInput.value = 20;
		submitPaymentInfo();
	});

	it('should sum total bill amount of all payments on sumPaymentTotal()', function () {
		expect(sumPaymentTotal('billAmt')).toEqual(100);

		billAmtInput.value = 200;
		tipAmtInput.value = 40;
		submitPaymentInfo();

		expect(sumPaymentTotal('billAmt')).toEqual(300);
	});

	it('should sum total tip amount of all payments on sumPaymentTotal()', function () {
		expect(sumPaymentTotal('tipAmt')).toEqual(20);

		billAmtInput.value = 200;
		tipAmtInput.value = 40;
		submitPaymentInfo();

		expect(sumPaymentTotal('tipAmt')).toEqual(60);
	});

	it('should sum total tip percent on sumPaymentTotal()', function () {
		expect(sumPaymentTotal('tipPercent')).toEqual(20);

		billAmtInput.value = 100;
		tipAmtInput.value = 20;
		submitPaymentInfo();

		expect(sumPaymentTotal('tipPercent')).toEqual(40);
	});

	it('should sum tip percent of a single tip on calculateTipPercent()', function () {
		expect(calculateTipPercent(100, 23)).toEqual('23.00');
		expect(calculateTipPercent(111, 11)).toEqual('9.91');
	});

	it('should generate new td from value and append to tr on appendTd(tr, value)', function () {
		let newTr = document.createElement('tr');
		appendTd(newTr, 'test');

		expect(newTr.children.length).toEqual(1);
		expect(newTr.firstChild.innerHTML).toEqual('test');
	});

	it('should generate delete td and append to tr on appendDeleteBtn(tr)', function () {
		let newTr = document.createElement('tr');
		appendDeleteBtn(newTr);

		expect(newTr.children.length).toEqual(1);
		expect(newTr.firstChild.innerHTML).toEqual('×');
	});

	afterEach(function () {
		// teardown logic
		paymentTbody.innerHTML = '';
		summaryTds[0].innerHTML = '';
		summaryTds[1].innerHTML = '';
		summaryTds[2].innerHTML = '';
		allPayments = {};
		paymentId = 0;
	});
});
