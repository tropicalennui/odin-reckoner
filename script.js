function operate(num1, operator, num2) {
	return operator == '+' ? num1 + num2
		: operator == '-' ? num1 - num2
			: operator == '*' ? num1 * num2
				: operator == '/' ? num1 / num2
					: 'ERROR';
}

let firstNum = 0;
let secondNum = 0;
let action = '';

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

let result = '';
const resultClear = '0';
const resultDiv = document.getElementById('result');
resultDiv.innerText = `${resultClear}`;

let input = '';
const inputClear = 'Waiting for input...'
const inputDiv = document.getElementById('input');
inputDiv.innerText = `${inputClear}`;

const calcButtonDivs = document.querySelectorAll('.calc-button');
calcButtonDivs.forEach(calcButtonDiv => {
	calcButtonDiv.addEventListener('click', clicker);
});

const clearButton = document.getElementById('clr');
clearButton.addEventListener('click', function (e) {
	input = '';
	inputDiv.innerText = `${inputClear}`;
});