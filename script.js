function add(num1,num2) {
    //Returning the added numbers using "+";
    return num1 + num2;
};


function substract(num1,num2) {
    //return the subtracted numbers using "-";
    return num1 - num2;
};

function multiply(num1,num2) {
    //multiplies and returns
    return num1 * num2;
}

function divide(num1,num2) {
    //divides and returns
    return num1 / num2;
}

function operate(operator,num1,num2){
    switch(operator){
        case "+":
            return add(num1,num2);
        case "-":
            return substract(num1,num2);
        case "*":
            return multiply(num1,num2);
        case "/":
            return divide(num1,num2);
        default:
            console.log("ERROR IN OPERATOR!");
    }
}