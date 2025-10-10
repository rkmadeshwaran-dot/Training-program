let display: HTMLElement | null = document.getElementById('display');
let currentValue: string = '0';
let previousValue: string = '';
let operator: string = '';
let waitingForOperand: boolean = false;

function updateDisplay(): void {
    if (display) {
        display.textContent = currentValue;
    }
}

function appendNumber(num: string): void {
    if (waitingForOperand) {
        currentValue = num;
        waitingForOperand = false;
    } else {
        currentValue = currentValue === '0' ? num : currentValue + num;
    }
    updateDisplay();
}

function setOperator(op: string): void {
    if (operator && !waitingForOperand) {
        calculate();
    }
    previousValue = currentValue;
    operator = op;
    waitingForOperand = true;
}

function calculate(): void {
    if (!operator || waitingForOperand) return;
    
    const prev: number = parseFloat(previousValue);
    const current: number = parseFloat(currentValue);
    let result: number = 0;

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

function clearDisplay(): void {
    currentValue = '0';
    previousValue = '';
    operator = '';
    waitingForOperand = false;
    updateDisplay();
}