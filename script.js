function add(num1,num2) {
    //Returning the added numbers using "+";
    return parseInt(num1) + parseInt(num2);
};


function substract(num1,num2) {
    //return the subtracted numbers using "-";
    return parseInt(num1) - parseInt(num2);
};

function multiply(num1,num2) {
    //multiplies and returns
    return parseInt(num1) * parseInt(num2);
}

function divide(num1,num2) {
    //divides and returns
    return parseInt(num1) / parseInt(num2);
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

function clearAll(e){
    display.textContent = 0;
    let firstNum = null;
    let lastNum = null;
    let operator = null;
}

function animateButton(e) {
    console.log("animation!");
    this.classList.remove("buttonAnimation");
    this.classList.add("buttonAnimation");
}

function stopButtonAnimation(e){
    this.classList.remove("buttonAnimation");
}

function operatorPressed(e){
    if(operator == null) operator = this.textContent;
    if(firstNum == null) {
        firstNum = display.textContent;
        display.textContent = 0;
        return;
    }
    if(firstNum !== null) {
        console.log(firstNum);
        console.log(display.textContent);
        console.log(operator);
        let result = operate(operator,firstNum, display.textContent);
        display.textContent = result;
        firstNum = result;
        operator = this.textContent;
    }
};


function clearOperationMemory(){
    let firstNum = null;
    let lastNum = null;
    let operator = null;
}

//Floating operation. Array of operator and numbers is added for memory.
let firstNum = null;
let lastNum = null;
let operator = null;

//Get display value and add it to a variable that always has it.
let display = document.querySelector(".display");
let displayValue = display.textContent;

//Get all number buttons and add eventlisteners to them
let numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(number => number.addEventListener("click",addToDisplay));

//Add clear button and event listener to it
let clearButton = document.querySelector(".clear");
clearButton.addEventListener("click",clearAll);

//Adding operation buttons
let addButton = document.querySelector(".plus");
let minusButton = document.querySelector(".minus");
let multiplyButton = document.querySelector(".multiply");
let divideButton = document.querySelector(".divide");
addButton.addEventListener("click", operatorPressed);
minusButton.addEventListener("click", operatorPressed);
multiplyButton.addEventListener("click", operatorPressed);
divideButton.addEventListener("click", operatorPressed);


//Adding animation to buttons
let allButtons = document.querySelectorAll(".button");
allButtons.forEach(button => button.addEventListener("click", animateButton));
allButtons.forEach(button => button.addEventListener("animationend", stopButtonAnimation));