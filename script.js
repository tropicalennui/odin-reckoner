
const resultClear = '0';
const inputClear = 'Waiting for input...'
const resultDiv = document.getElementById('result');
const inputDiv = document.getElementById('input');
const calcButtonDivs = document.querySelectorAll('.calc-button');
const clearButton = document.getElementById('clr');

let input = '';
let result = '';
let firstNum = '';
let secondNum = '';
let action = '';

resultDiv.innerText = `${resultClear}`;
inputDiv.innerText = `${inputClear}`;
calcButtonDivs.forEach(calcButtonDiv => {
	calcButtonDiv.addEventListener('click', interact);
});
clearButton.addEventListener('click', clear);

function operate(num1, operator, num2) {
	return operator == '+' ? num1 + num2
		: operator == '-' ? num1 - num2
			: operator == '*' ? num1 * num2
				: operator == '/' ? num1 / num2
					: 'ERROR';
}

function interact(clickedDiv) {
	const operators = ['+', '-', '*', '/'];

	if (action === '' && !Number.isNaN(parseInt(clickedDiv.target.id))) {
		//store the first number until an operator is selected
		if (firstNum === '') {
			firstNum = clickedDiv.target.id;
		} else {
			firstNum += clickedDiv.target.id;
		}
		input = firstNum;
	} else if (operators.includes(clickedDiv.target.id) && firstNum !== '' && secondNum === '') {
		//store the last operator clicked until second number is selected
		action = clickedDiv.target.id;
		input = firstNum + ' ' + action;
	} else if (firstNum !== '' && action !== '' && !Number.isNaN(parseInt(clickedDiv.target.id))) {
		//store the second number until another operator or equals is selected
		if (secondNum === '') {
			secondNum = clickedDiv.target.id;
		} else {
			secondNum += clickedDiv.target.id;
		}
		input = firstNum + ' ' + action + ' ' + secondNum;
	} else if (operators.includes(clickedDiv.target.id) && secondNum !== '') {
		//operate the two numbers and save as firstNum
		firstNum = operate(parseInt(firstNum), action, parseInt(secondNum));
		action = clickedDiv.target.id;
		secondNum = '';
		input = firstNum + ' ' + action;
	}

	inputDiv.innerText = `${input}`;
}

function clear() {
	input = '';
	result = '';
	firstNum = '';
	secondNum = '';
	action = '';
	resultDiv.innerText = `${resultClear}`;
	inputDiv.innerText = `${inputClear}`;
}