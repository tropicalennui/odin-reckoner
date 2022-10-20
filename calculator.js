const defaultResult = '0';
const defaultInput = 'Waiting for input...'
const resultDiv = document.getElementById('result');
const inputDiv = document.getElementById('input');
const clearDiv = document.getElementById('clr');
const equalsDiv = document.getElementById('=');
const numberDivs = document.querySelectorAll('.number');
const operationDivs = document.querySelectorAll('.operation');
const backspaceDiv = document.getElementById('backspace');
const numberMap = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

let firstNum = '';
let secondNum = '';
let action = '';
let clickedDivId = '';
let key = '';

resultDiv.innerText = `${defaultResult}`;
inputDiv.innerText = `${defaultInput}`;

//keyboard
document.addEventListener('keypress', captureKey);

//click
clearDiv.addEventListener('click', clear);
equalsDiv.addEventListener('click', equals);
numberDivs.forEach(numberDiv => {
	numberDiv.addEventListener('click', captureClick);
});
operationDivs.forEach(operationDiv => {
	operationDiv.addEventListener('click', captureClick);
});
backspaceDiv.addEventListener('click', backspace);

function captureKey(pressed) {
	key = pressed.key;
	console.log(pressed.key);
	console.log(key);
	if (numberMap.includes(key)) {
		number(key);
	}
}

function captureClick(click) {
	clickedDivId = click.target.id;
	if (click.target.classList.contains('number')) {
		number(clickedDivId);
	} else if (click.target.classList.contains('operation')) {
		operation(clickedDivId);
	}
}

function operation(op) {
	action = op;
	if (firstNum !== '' && secondNum === '') {
		//store the last operator clicked until second number is selected
		inputDiv.innerText = firstNum + ' ' + action;
	} else if (secondNum !== '') {
		//operate the two numbers and save as firstNum
		firstNum = operate(parseInt(firstNum), action, parseInt(secondNum));
		secondNum = '';
		inputDiv.innerText = firstNum + ' ' + action;
	}
}

function number(num) {
	if (action === '') {
		//store the first number until an operator is selected
		if (firstNum === '') {
			firstNum = num;
		} else {
			firstNum += num;
		}
		inputDiv.innerText = firstNum;
	} else if (action !== '' && firstNum !== '') {
		//store the second number until another operator or equals is selected
		if (secondNum === '') {
			secondNum = num;
		} else {
			secondNum += num;
		}
		inputDiv.innerText = firstNum + ' ' + action + ' ' + secondNum;
	}
	toggleDisabled()
}

function equals() {
	if (firstNum !== '' && secondNum !== '' && action !== '') {
		//operate the two numbers and set the result field
		resultDiv.innerText = operate(parseInt(firstNum), action, parseInt(secondNum));
		inputDiv.innerText = firstNum + ' ' + action + ' ' + secondNum + ' =';
		nullVars();
		toggleDisabled()
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
	nullVars();
	resultDiv.innerText = `${defaultResult}`;
	inputDiv.innerText = `${defaultInput}`;
	toggleDisabled()
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
	toggleDisabled()
}

function toggleDisabledOperations() {
	if (firstNum !== '') {
		operationDivs.forEach(operationDiv => {
			if (operationDiv.classList.contains('disabled')) {
				operationDiv.classList.toggle('disabled');
			}
		});
	} else {
		operationDivs.forEach(operationDiv => {
			if (!operationDiv.classList.contains('disabled')) {
				operationDiv.classList.toggle('disabled');
			}
		});
	}
}

function toggleDisabledEquals() {
	if (secondNum !== '' && equalsDiv.classList.contains('disabled')) {
		equalsDiv.classList.toggle('disabled');
	} else if (secondNum == '' && !equalsDiv.classList.contains('disabled')) {
		equalsDiv.classList.toggle('disabled');
	}
}

function toggleDisabledClear() {
	if (firstNum !== '' && clearDiv.classList.contains('disabled')) {
		clearDiv.classList.toggle('disabled');
	} else if (firstNum == '' && !clearDiv.classList.contains('disabled')) {
		clearDiv.classList.toggle('disabled');
	}
}

function toggleDisabledBackspace() {
	if (firstNum !== '' && backspaceDiv.classList.contains('disabled')) {
		backspaceDiv.classList.toggle('disabled');
	} else if (firstNum == '' && !backspaceDiv.classList.contains('disabled')) {
		backspaceDiv.classList.toggle('disabled');
	}
}

function toggleDisabled() {
	toggleDisabledOperations();
	toggleDisabledEquals();
	toggleDisabledBackspace();
	toggleDisabledClear();
}

function nullVars() {
	firstNum = '';
	secondNum = '';
	action = '';
}