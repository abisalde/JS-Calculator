/* jshint esversion: 6 */

const calc = {
    displayValue: '0',
    hasDecimal: false,
    hasResult: false,
    completeInput: false,
    output: [],
    outputValue: ''
};
// Selection global html document using querySelector
const numberKeys = document.querySelector('#num_keys');
const finalOutput = document.querySelector('#calc-output');
const inputDisplay = document.querySelector('#calc-display');
const outputDisplay = document.querySelector('#calc-output');

// Arithmetic Operators declaration
const operators = ['+', '/', '*', '-', '%'];

const displayInput = (charDisplay) => {
    const { displayValue } = calc;
    calc.displayValue = displayValue === '0' ? charDisplay : displayValue + charDisplay;
    if (calc.displayValue.length > 0 && calc.displayValue[calc.displayValue.length - 1] >= 0) {
        calc.completeInput = true;
    } else calc.completeInput = false;

};

const displayOutput = (charDisplay) => {
    charDisplay = charDisplay.toString().length > 10 ? charDisplay.toFixed(10) : charDisplay;
    calc.outputValue = charDisplay;
};

const decimalInput = (dot) => {
    let { hasResult } = calc;
    if (!calc.displayValue.includes(dot)) {
        calc.displayValue += dot;
    }
    if (hasResult) {
        displayInput(target.value) = "0.";
        hasResult = true;
    }
    calc.completeInput = false;
};

const calcDisplay = () => {
    const display = inputDisplay;
    const result = outputDisplay;
    display.value = calc.displayValue;
    result.value = calc.outputValue;
};

const keys = document.querySelector('.calc-values');
const resultKey = document.querySelector('[value="="]');

// Listener for all Keys and Buttons
keys.addEventListener('click', (keyEvent) => {
    displayOutput('');
    const { target } = keyEvent;
    const { output, outputValue, displayValue } = calc;

    if (!target.matches('button')) {
        return;
    }
    if (target.classList.contains('block')) {
        return;
    }
    if (target.classList.contains('notfirst')) {
        if (target.classList.contains('notfirstspecial') && calc.displayValue == '0') {
            calc.completeInput = false;
        } else {
            if (calc.completeInput) {
                calc.completeInput = false;
            } else return;
        }
    } else calc.completeInput = !calc.completeInput;

    if (target.classList.contains('decimal')) {
        decimalInput(target.value);
        calcDisplay();
        return;
    }

    displayInput(target.value);
    calcDisplay();
});

// listerner for the output
resultKey.addEventListener('click', (keyEvent) => {
    if (!calc.completeInput) return;
    const { target } = keyEvent;
    let { output, outputValue, displayValue } = calc;
    output = displayValue.match(/[\d\.]+|\D+/g);

    outputValue = eval(output.join(''));

    displayOutput(outputValue);
    calcDisplay();
});

const backSpace = () => {
    let inputValue = inputDisplay.value;
    if (inputDisplay.value.length <= 1) inputDisplay.value = '0';
    else inputDisplay.value = inputValue.substr(0, inputValue.length - 1);
    calc.displayValue = inputDisplay.value;
    if (inputValue.length > 0 && inputValue[inputValue.length - 2] >= 0) {
        calc.completeInput = true;
    } else calc.completeInput = false;
    return (inputValue);
};

const clear = () => {
    inputDisplay.value = '0';
    calc.displayValue = '0';
    calc.outputValue = '';
    displayOutput(' ');
    calcDisplay();
    calc.completeInput = false;
};

const loadAllEventListeners = () => {
    document.querySelector("button[value='clear']").addEventListener('click', clear);
    document.querySelector("button[value='back']").addEventListener('click', backSpace);
};

const startApp = () => {
    loadAllEventListeners();
    calcDisplay();
};

startApp();