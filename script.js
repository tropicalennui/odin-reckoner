
const resultClear = '0';
const inputClear = 'Waiting for input...'
const resultDiv = document.getElementById('result');
const inputDiv = document.getElementById('input');
const calcButtonDivs = document.querySelectorAll('.calc-button');
const clearButton = document.getElementById('clr');

let input = '';
let result = '';
let firstNum = 0;
let secondNum = 0;
let action = '';

resultDiv.innerText = `${resultClear}`;
inputDiv.innerText = `${inputClear}`;
calcButtonDivs.forEach(calcButtonDiv => {
	calcButtonDiv.addEventListener('click', clicker);
});
clearButton.addEventListener('click', clear);

function operate(num1, operator, num2) {
	return operator == '+' ? num1 + num2
		: operator == '-' ? num1 - num2
			: operator == '*' ? num1 * num2
				: operator == '/' ? num1 / num2
					: 'ERROR';
}

function clicker(e) {
	const operators = ['+', '-', '*', '/'];

	if (action == '' && !Number.isNaN(parseInt(e.target.id))) {
		if (firstNum == 0) {
			firstNum = e.target.id;
		} else {
			firstNum += e.target.id;
		}
		input = firstNum;
	}

	if (operators.includes(e.target.id)) {
		action = e.target.id;
		input = firstNum + ' ' + action;
	}

	if (firstNum != '' && action != '' && !Number.isNaN(parseInt(e.target.id))) {
		if (secondNum == 0) {
			secondNum = e.target.id;
		} else {
			secondNum += e.target.id;
		}
		input = firstNum + ' ' + action + ' ' + secondNum;
	}
	inputDiv.innerText = `${input}`;
}

function clear() {
	input = '';
	result = '';
	firstNum = 0;
	secondNum = 0;
	action = '';
	resultDiv.innerText = `${resultClear}`;
	inputDiv.innerText = `${inputClear}`;
}