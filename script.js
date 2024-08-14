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