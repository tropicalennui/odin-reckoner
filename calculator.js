const defaultResult = '0';
const defaultInput = 'Waiting for input...'
const resultDiv = document.getElementById('result');
const inputDiv = document.getElementById('input');
const clearDiv = document.getElementById('clr');
const equalsDiv = document.getElementById('=');
const numberDivs = document.querySelectorAll('.number');
const operationDivs = document.querySelectorAll('.operation');
const backspaceDiv = document.getElementById('backspace');

let firstNum = '';
let secondNum = '';
let action = '';

resultDiv.innerText = `${defaultResult}`;
inputDiv.innerText = `${defaultInput}`;
clearDiv.addEventListener('click', clear);
equalsDiv.addEventListener('click', equals);
numberDivs.forEach(numberDiv => {
	numberDiv.addEventListener('click', number);
});
operationDivs.forEach(operationDiv => {
	operationDiv.addEventListener('click', operation);
});
backspaceDiv.addEventListener('click', backspace);

function operation(clickedOp) {
	if (firstNum !== '' && secondNum === '') {
		//store the last operator clicked until second number is selected
		action = clickedOp.target.id;
		inputDiv.innerText = firstNum + ' ' + action;
	} else if (secondNum !== '') {
		//operate the two numbers and save as firstNum
		firstNum = operate(parseInt(firstNum), action, parseInt(secondNum));
		action = clickedOp.target.id;
		secondNum = '';
		inputDiv.innerText = firstNum + ' ' + action;
	}
}

function number(clickedNum) {
	if (action === '') {
		//store the first number until an operator is selected
		if (firstNum === '') {
			firstNum = clickedNum.target.id;
		} else {
			firstNum += clickedNum.target.id;
		}
		inputDiv.innerText = firstNum;
	} else if (action !== '' && firstNum !== '') {
		//store the second number until another operator or equals is selected
		if (secondNum === '') {
			secondNum = clickedNum.target.id;
		} else {
			secondNum += clickedNum.target.id;
		}
		inputDiv.innerText = firstNum + ' ' + action + ' ' + secondNum;
	}
}

function equals() {
	if (firstNum !== '' && secondNum !== '' && action !== '') {
		//operate the two numbers and set the result field
		resultDiv.innerText = operate(parseInt(firstNum), action, parseInt(secondNum));
		inputDiv.innerText = firstNum + ' ' + action + ' ' + secondNum + ' =';
		firstNum = '';
		action = '';
		secondNum = '';
	}
}

function operate(num1, operator, num2) {
	return operator == '+' ? num1 + num2
		: operator == '-' ? num1 - num2
			: operator == '*' ? num1 * num2
				: operator == '/' ? num1 / num2
					: 'ERROR';
}

function clear() {
	firstNum = '';
	secondNum = '';
	action = '';
	resultDiv.innerText = `${defaultResult}`;
	inputDiv.innerText = `${defaultInput}`;
}

function backspace() {
	if (action === '' && firstNum.length == 1) {
		clear();
		return;
	} else if (action === '' && firstNum.length > 1) {
		firstNum = firstNum.slice(0, -1);
		inputDiv.innerText = firstNum;
	} else if (secondNum.length == 1) {
		secondNum = '';
		inputDiv.innerText = firstNum + ' ' + action;
	} else if (secondNum.length > 1) {
		secondNum = secondNum.slice(0, -1);
		inputDiv.innerText = firstNum + ' ' + action + ' ' + secondNum;
	} else if (action !== '' && secondNum === '') {
		action = '';
		inputDiv.innerText = firstNum;
	}
}