const numberButtonsContainer = document.querySelector('.number-buttons');
const operandButtons = document.querySelectorAll('.operand-buttons > .row > .operand');
const calcDisplay = document.querySelector('.display > input');
const solveButton = document.getElementById('=');
const errorMessageParagraph = document.querySelector('.error');
const clearButton = document.querySelector('#clear');

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

    })
});

solveButton.addEventListener('click', e => {
    solve(calcDisplay.value);
});

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

clearButton.addEventListener('click', e => {
    calcDisplay.value = '';
})

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