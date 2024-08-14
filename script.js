const numberButtonsContainer = document.querySelector('.number-buttons');
const operandButtons = document.querySelectorAll('.operand-buttons > .row > .operand');
const calcDisplay = document.querySelector('.display > input');
const solveButton = document.getElementById('=');

numberButtonsContainer.addEventListener('click', e => {
    let target = e.target;

    if (target.localName == 'button') {
        calcDisplay.value += target.id;
    }
});

operandButtons.forEach(el => {
    el.addEventListener('click' , e => {
        calcDisplay.value += e.target.id
    })
});

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


let numberOne, numberTwo, operator, result;

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



