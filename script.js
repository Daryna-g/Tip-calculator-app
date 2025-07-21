const amountPerson = document.getElementById("tip-amount");
const amountTotal = document.getElementById("total");
const billInput = document.querySelector(".form__input-bill");
const peopleInput = document.querySelector(".form__input-people");
const customTipInput = document.querySelector(".form__input--custom");
const billWarning = document.querySelector(".warning-bill");
const peopleWarning = document.querySelector(".warning-people");
const resetForm = document.querySelector(".form__button");


function calcTip() {
	if (!validateInputs()) {
		return;
	}

	const bill = parseFloat(billInput.value);
	const numPeople = parseInt(peopleInput.value);
	const tipPercent = calcPercent();

	let tip = (bill * tipPercent) / 100;
	let tipPerPerson = tip / numPeople;
	let totalPerPerson = (bill + tip) / numPeople;

	amountPerson.textContent = `$${tipPerPerson.toFixed(2)}`;
	amountTotal.textContent = `$${totalPerPerson.toFixed(2)}`;
}

function calcPercent() {
	const customTip = Number(customTipInput.value);

	if (!isNaN(customTip) && customTip > 0) {
		return customTip;
	} else {
		const selectedRadio = document.querySelector('input[name="tip"]:checked');
		if (selectedRadio) {
			return parseFloat(selectedRadio.value);
		} else {
			return 0;
		}
	}
}

function validateInputs() {
	const bill = parseFloat(billInput.value);
	const numPeople = parseInt(peopleInput.value);

	let isValid = true;

	if (isNaN(bill) || bill <= 0) {
		showError(
			billInput,
			billWarning,
			bill <= 0 ? "Can't be 0" : "Can't be empty"
		);
		amountPerson.textContent = "$0.00";
		amountTotal.textContent = "$0.00";
		isValid = false;
	} else {
		hideError(billInput, billWarning);
	}

	if (isNaN(numPeople) || numPeople <= 0) {
		showError(
			peopleInput,
			peopleWarning,
			numPeople <= 0 ? "Can't be 0" : "Can't be empty"
		);
		amountPerson.textContent = "$0.00";
		amountTotal.textContent = "$0.00";
		isValid = false;
	} else {
		hideError(peopleInput, peopleWarning);
	}

	return isValid;
}