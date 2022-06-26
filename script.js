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
    console.log(num1);
    console.log(num2);
    return num1 * num2;
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
    //If one operation has already happened
    if(firstNum !== null && operationHappened == true) {
        display.textContent = this.textContent;
        operationHappened = false;
        return;
    }
    //special case if it's -0 because -08 looks stupid
    if(display.textContent == "-0") {
        display.textContent = "-" + this.textContent;
        return;
    }
    if(display.textContent == 0) {
        display.textContent = this.textContent;
        console.log("is 0");
        return;
    }
    display.textContent = display.textContent+this.textContent;
}

function clearAll(e){
    display.textContent = 0;
    firstNum = null;
    lastNum = null;
    operator = null;
}

function animateButton(e) {
    this.classList.remove("buttonAnimation");
    this.classList.add("buttonAnimation");
}

function stopButtonAnimation(e){
    this.classList.remove("buttonAnimation");
}

function getOperator(e){
    let returnValue = "";
    if(e.target.textContent == "÷"){
        returnValue = "/";
    } else {
        returnValue = e.target.textContent;
    }
    return returnValue;
}

//This is started if an operator is pressed and it calculates.
function operatorPressed(e){
    //if operator hasn't been pressed, then add display and operator to memory and return. 
    
    if(operator == null) {
        operator = getOperator(e);
        console.log("Setting first num");
        firstNum = display.textContent;
        display.textContent = 0;
        return;
    }
    if(firstNum !== null && operationHappened == false) {
        console.log(firstNum);
        console.log(display.textContent);
        console.log(operator);
        let result = operate(operator,firstNum, display.textContent);
        display.textContent = result;
        firstNum = result;
        operator = getOperator(e);
        operationHappened = true;
        return;
    }
    if(firstNum !== null && operationHappened == true) {
        return;
    }
};

function equalsPressed(e) {
    //Just operates based on memory values and display.textContent
    display.textContent = operate(operator,firstNum, display.textContent);
}

//Makes number plus or minus by multiplying with -1
function numberToPlusOrMinus(){
    if(display.textContent !== "0") {
        display.textContent = display.textContent * (-1);
    } else {
        display.textContent = "-0";
    }
}

function toPercent(){
    display.textContent = display.textContent/100;
}

function addDot(){
    if(!display.textContent.includes(".")){
        display.textContent = display.textContent + ".";
    }
}

//Needed variables for functionality
//firstNum is the number that is stored from the last screen
let firstNum = null;
//the operator that was called.
let operator = null;
let operationHappened = false;

//Get display value and add it to a variable that always has it.
let display = document.querySelector(".display");
let displayValue = display.textContent;

//Get all number buttons and add eventlisteners to them
let numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(number => number.addEventListener("click",addToDisplay));

//Get +/- button and add eventlistener
let plusOrMinusButton = document.querySelector(".plusOrMinus");
plusOrMinusButton.addEventListener("click", numberToPlusOrMinus);

//Get % button and add eventlistener
let percentButton = document.querySelector(".percent");
percentButton.addEventListener("click", toPercent);

//Get "." button and add eventlistener
let dotButton = document.querySelector(".dot");
dotButton.addEventListener("click", addDot);

//Add clear button and event listener to it
let clearButton = document.querySelector(".clear");
clearButton.addEventListener("click",clearAll);

//Adding operation buttons
//Math ops
let addButton = document.querySelector(".plus");
let minusButton = document.querySelector(".minus");
let multiplyButton = document.querySelector(".multiply");
let divideButton = document.querySelector(".divide");
addButton.addEventListener("click", operatorPressed);
minusButton.addEventListener("click", operatorPressed);
multiplyButton.addEventListener("click", operatorPressed);
divideButton.addEventListener("click", operatorPressed);
//Equals button
let equalsButton = document.querySelector(".equals");
equalsButton.addEventListener("click", equalsPressed);

//Adding animation to buttons
let allButtons = document.querySelectorAll(".button");
//Add animation eventlistener
allButtons.forEach(button => button.addEventListener("click", animateButton));
//Remove animation eventlistener
allButtons.forEach(button => button.addEventListener("animationend", stopButtonAnimation));