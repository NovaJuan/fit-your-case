const devices = {
	Samsung: {
		'Galaxy S20': ['S20 Ultra', 'S20 Plus', 'S20'],
		'Galaxy Note 10': ['10 Plus', '10'],
	},
	Apple: {
		'iPad Pro': ['12.9 inch', '11 inch'],
		'iPhone 11': ['11', '11 Pro', '11 Pro Max'],
	},
};

const urlParams = new URLSearchParams(window.location.search);

const make = document.querySelector('#make');
const model = document.querySelector('#model');
const version = document.querySelector('#version');
let selectedMake = urlParams.get('make') || null;
let selectedModel = urlParams.get('model') || null;
let selectedVersion = urlParams.get('version') || null;

function setMakeOptions() {
	make.innerHTML = `
			<option value="" disabled ${!selectedMake && 'selected'}>Make</option>
			${Object.keys(devices).map(
				(item) =>
					`<option value="${item}" ${
						item === selectedMake && 'selected'
					}>${item}</option>`
			)}
		`;
}

function setModelOptions() {
	if (selectedModel) {
		model.removeAttribute('disabled');
	}
	model.innerHTML = `
			<option value="" disabled ${!selectedModel && 'selected'}>Model</option>
			${
				selectedMake &&
				Object.keys(devices[selectedMake]).map(
					(item) =>
						`<option value="${item}" ${
							item === selectedModel && 'selected'
						}>${item}</option>`
				)
			}
		`;
}

function setVersionOptions() {
	if (selectedVersion) {
		version.removeAttribute('disabled');
	}
	version.innerHTML = `
			<option value="" disabled ${!selectedVersion && 'selected'}>Version</option>
			${
				selectedModel &&
				devices[selectedMake][selectedModel].map(
					(item) =>
						`<option value="${item}" ${
							item === selectedVersion && 'selected'
						}>${item}</option>`
				)
			}
		`;
}

setMakeOptions();
setModelOptions();
setVersionOptions();

function selectionHandler(e) {
	switch (e.target.id) {
		case 'make':
			selectedMake = e.target.value;
			selectedModel = null;
			selectedVersion = null;

			setModelOptions();

			version.innerHTML = `
				<option value="" disabled selected>Version</option>
			`;

			model.removeAttribute('disabled');
			version.setAttribute('disabled', '');
			break;
		case 'model':
			selectedModel = e.target.value;
			selectedVersion = null;

			setVersionOptions();

			version.removeAttribute('disabled');
			break;
		case 'version':
			selectedVersion = e.target.value;
			break;

		default:
			return;
	}
}

make.addEventListener('change', selectionHandler);
model.addEventListener('change', selectionHandler);
version.addEventListener('change', selectionHandler);

// Handle form submission
const form = document.querySelector('#search-bar');
const error = document.querySelector('#error');

function onSubmit(e) {
	e.preventDefault();
	error.innerText = null;

	if (
		selectedMake === null ||
		selectedModel === null ||
		selectedVersion === null
	) {
		error.innerText = 'Fill all the fields below.';
		return;
	}

	form.submit();
}

form.addEventListener('submit', onSubmit);
