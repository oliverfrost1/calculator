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

function addToDisplay(e){
    if(display.textContent == 0) {
        display.textContent = this.textContent;
        return;
    }
    display.textContent = display.textContent+this.textContent;
}

function clear(e){
    display.textContent = 0;
}

//Get display value and add it to a variable that always has it.
let display = document.querySelector(".display");
let displayValue = display.textContent;

//Get all number buttons and add eventlisteners to them
let numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(number => number.addEventListener("click",addToDisplay));

//Add clear button and event listener to it
let clearButton = document.querySelector(".clear");
clearButton.addEventListener("click",clear);