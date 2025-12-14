let display = document.querySelector('.display .result');
let currentInput = '0';
let operator = '';
let previousInput = '';
let waitingForOperand = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function inputDigit(digit) {
    if (waitingForOperand) {
        currentInput = digit;
        waitingForOperand = false;
    } else {
        currentInput = currentInput === '0' ? digit : currentInput + digit;
    }
    updateDisplay();
}

function inputDecimal() {
    if (waitingForOperand) {
        currentInput = '0.';
        waitingForOperand = false;
    } else if (currentInput.indexOf('.') === -1) {
        currentInput += '.';
    }
    updateDisplay();
}

function clear() {
    currentInput = '0';
    operator = '';
    previousInput = '';
    waitingForOperand = false;
    updateDisplay();
}

function performOperation(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (previousInput === '') {
        previousInput = inputValue;
    } else if (operator) {
        const currentValue = previousInput || 0;
        const newValue = calculate(currentValue, inputValue, operator);
        currentInput = String(newValue);
        previousInput = newValue;
    }

    waitingForOperand = true;
    operator = nextOperator;
    updateDisplay();
}

function calculate(firstValue, secondValue, operation) {
    switch (operation) {
        case '+':
            return firstValue + secondValue;
        case '-':
            return firstValue - secondValue;
        case '×':
            return firstValue * secondValue;
        case '÷':
            return firstValue / secondValue;
        case '%':
            return firstValue % secondValue;
        default:
            return secondValue;
    }
}

function performEquals() {
    const inputValue = parseFloat(currentInput);

    if (previousInput !== '' && operator) {
        const newValue = calculate(parseFloat(previousInput), inputValue, operator);
        currentInput = String(newValue);
        previousInput = '';
        operator = '';
        waitingForOperand = true;
        updateDisplay();
    }
}

function toggleSign() {
    currentInput = String(-parseFloat(currentInput));
    updateDisplay();
}

function percent() {
    currentInput = String(parseFloat(currentInput) / 100);
    updateDisplay();
}

document.querySelector('.clear').addEventListener('click', clear);
document.querySelector('.plus-minus').addEventListener('click', toggleSign);
document.querySelector('.percent').addEventListener('click', percent);
document.querySelector('.divide').addEventListener('click', () => performOperation('÷'));
document.querySelector('.multiply').addEventListener('click', () => performOperation('×'));
document.querySelector('.subtract').addEventListener('click', () => performOperation('-'));
document.querySelector('.add').addEventListener('click', () => performOperation('+'));
document.querySelector('.equals').addEventListener('click', performEquals);

document.querySelector('.seven').addEventListener('click', () => inputDigit('7'));
document.querySelector('.eight').addEventListener('click', () => inputDigit('8'));
document.querySelector('.nine').addEventListener('click', () => inputDigit('9'));
document.querySelector('.four').addEventListener('click', () => inputDigit('4'));
document.querySelector('.five').addEventListener('click', () => inputDigit('5'));
document.querySelector('.six').addEventListener('click', () => inputDigit('6'));
document.querySelector('.one').addEventListener('click', () => inputDigit('1'));
document.querySelector('.two').addEventListener('click', () => inputDigit('2'));
document.querySelector('.three').addEventListener('click', () => inputDigit('3'));
document.querySelector('.zero').addEventListener('click', () => inputDigit('0'));
document.querySelector('.decimal').addEventListener('click', inputDecimal);