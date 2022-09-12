function operate(num1, operator, num2) {
	return operator == '+' ? num1 + num2
		: operator == '-' ? num1 - num2
			: operator == '*' ? num1 * num2
				: operator == '/' ? num1 / num2
					: 'ERROR';
}

let result = '8008S';
const resultDiv = document.getElementById('result');
resultDiv.innerText = `${result}`;

let input = '';
const inputDiv = document.getElementById('input');

const calcButtonDivs = document.querySelectorAll('.calc-button');
calcButtonDivs.forEach(calcButtonDiv => {
	calcButtonDiv.addEventListener('click', function (e) {
		input += e.target.id;
		inputDiv.innerText = `${input}`;
	});
});

const clearButton = document.getElementById('clr');
clearButton.addEventListener('click', function (e) {
	input = '';
	inputDiv.innerText = `${input}`;
});