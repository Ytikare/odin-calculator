// Selecting needed elements

const numberButtonsContainer = document.querySelector('.number-buttons');
const operandButtons = document.querySelectorAll('.operand-buttons > .row > .operand');
const calcDisplay = document.querySelector('.display > input');
const solveButton = document.getElementById('=');
const errorMessageParagraph = document.querySelector('.error');
const clearButton = document.querySelector('#clear');
const decimalSymbolButton = document.querySelector('.dot');
const backspaceButton = document.getElementById('backspace');
const guideMarker = document.querySelector('.marker');
const instructionsSection = document.querySelector('.instructions');

//Adding events to elements

document.querySelector('.buttons').addEventListener('mouseover', e => {
    let target = e.target;
    if (target.localName == 'button') {
        target.classList.add('hover');
    }
})

document.querySelector('.buttons').addEventListener('mouseout', e => {
    let target = e.target;
    if (target.localName == 'button') {
        target.classList.remove('hover');
    }
})

numberButtonsContainer.addEventListener('click', e => {
    let target = e.target;

    if (target.localName == 'button') {
        addToCalcDisplay(target.id);
    }
});

operandButtons.forEach(el => {
    el.addEventListener('click', e => {
        if (checkIfExpressionContainsOperands(calcDisplay.value)) {
            solve(calcDisplay.value);
        }
        addToCalcDisplay(` ${e.target.id} `);
        enableButton(decimalSymbolButton);
    })
});

solveButton.addEventListener('click', e => {
    solve(calcDisplay.value);
    enableButton(decimalSymbolButton);
});

decimalSymbolButton.addEventListener('click', e => {
    e.stopPropagation();
    addToCalcDisplay(e.target.id);
    e.target.disabled = true;
})

clearButton.addEventListener('click', e => {
    calcDisplay.value = '';
    enableButton(decimalSymbolButton);
})

backspaceButton.addEventListener('click', () => {
    let displayText = calcDisplay.value;
    let displayLength = calcDisplay.value.length;
    let endChar = displayText[displayLength - 1];

    if (endChar ==  ' ') {
        calcDisplay.value = displayText.substring(0, displayLength - 3);
    } else if (endChar >= '0' && endChar <= '9') {
        calcDisplay.value = displayText.substring(0, displayLength - 1);
    } else if (endChar == '.') {
        calcDisplay.value = displayText.substring(0, displayLength - 1);
        enableButton(decimalSymbolButton);
    }
})

guideMarker.addEventListener('mouseover', () =>{
    instructionsSection.classList.remove('hidden');
})

guideMarker.addEventListener('mouseout', () => {
    instructionsSection.classList.add('hidden');
})

//Custom functions

function solve(expression) {
    //.filter() here remover empty entires
    let parts = expression.split(' ').filter(el => el);

    let result;

    if (parts.length == 4) {

        result = `${calculateInput(parts[0], parts[2], parts[1])} ${parts[3]}`;
        errorMessageParagraph.classList.add('hidden');

    } else if (parts.length == 3) {
        result = calculateInput(parts[0], parts[2], parts[1]);

        errorMessageParagraph.classList.add('hidden');
    } else if (parts.length == 2) {
        errorMessageParagraph.classList.remove('hidden');
    }


    if (result) {
        calcDisplay.value = result;
    }
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function calculateInput(textNum1, textNum2, operand) {
    let num1 = Number(textNum1);
    let num2 = Number(textNum2);

    return operate(num1, num2, operand);
}

function operate(operatorOne, operatorTwo, operand) {
    switch (operand) {
        case '+':
            result = add(operatorOne, operatorTwo);
            break;

        case '-':
            result = subtract(operatorOne, operatorTwo);
            break;

        case '*':
            result = multiply(operatorOne, operatorTwo);
            break;

        case '/':
            result = divide(operatorOne, operatorTwo);
            break;
    }

    return result;
}

function addToCalcDisplay(expression) {
    calcDisplay.value += expression;
}

function checkIfExpressionContainsOperands(expressions) {
    return expressions.match(/\+*-*\/*\**/g).filter(n => n).length != 0;
}

function enableButton(button) {
    button.disabled = false;
}