"use strict";
let display = document.getElementById('display');
let currentValue = '0';
let previousValue = '';
let operator = '';
let waitingForOperand = false;
function updateDisplay() {
    if (display) {
        display.textContent = currentValue;
    }
}
function appendNumber(num) {
    if (waitingForOperand) {
        currentValue = num;
        waitingForOperand = false;
    }
    else {
        currentValue = currentValue === '0' ? num : currentValue + num;
    }
    updateDisplay();
}
function setOperator(op) {
    if (operator && !waitingForOperand) {
        calculate();
    }
    previousValue = currentValue;
    operator = op;
    waitingForOperand = true;
}
function calculate() {
    if (!operator || waitingForOperand)
        return;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    let result = 0;
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
    }
    currentValue = String(result);
    operator = '';
    waitingForOperand = true;
    updateDisplay();
}
function clearDisplay() {
    currentValue = '0';
    previousValue = '';
    operator = '';
    waitingForOperand = false;
    updateDisplay();
}
//# sourceMappingURL=cal.js.map