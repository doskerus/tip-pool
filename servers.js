let serverNameInput = document.getElementById('serverName');
let serverTbody = document.querySelector('#serverTable tbody');
let allServers = {};
let serverId = 0;

// create server object and add to allServers, update html and reset input
function submitServerInfo(event) {
	if (event) event.preventDefault(); // when running tests there is no event

	let serverName = serverNameInput.value;

	if (serverName !== '') {
		serverId++;
		allServers['server' + serverId] = { serverName };

		updateServerTable();

		serverNameInput.value = '';
	}
}

// create table row element and pass to appendTd function with input value
function updateServerTable() {
	serverTbody.innerHTML = '';

	for (let key in allServers) {
		let curServer = allServers[key];

		let newTr = document.createElement('tr');
		newTr.setAttribute('id', key);

		let tipAverage = sumPaymentTotal('tipAmt') / Object.keys(allServers).length;

		appendTd(newTr, curServer.serverName);
		appendTd(newTr, '$' + tipAverage.toFixed(2));
		appendDeleteBtn(newTr);

		serverTbody.append(newTr);
	}
}

// init
let serverForm = document.getElementById('serverForm');
serverForm.addEventListener('submit', submitServerInfo);
