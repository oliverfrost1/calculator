//THERE IS A BUG WITH firstNum and equals and operators you
//may need to add more variables for the continually pressing =
//and differentiate that from firstNum

function add(num1,num2) {
    //Returning the added numbers using "+";
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    return num1 + num2;
};


function substract(num1,num2) {
    //return the subtracted numbers using "-";
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    return num1 - num2;
};

function multiply(num1,num2) {
    //multiplies and returns
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    return num1 * num2;
}

function divide(num1,num2) {
    //divides and returns
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    if(num2 == 0) return "You silly goose!";
    return num1 / num2;
}

function operate(operator,num1,num2){
    let calculated = 0;
    lastOperationFirstNum = num1;
    lastOperationLastNum = num2;
    lastOperationOperator = operator;
    switch(operator){
        case "+":
            calculated = add(num1,num2);
            break;
        case "-":
            calculated = substract(num1,num2);
            break;
        case "*":
            calculated = multiply(num1,num2);
            break;
        case "/":
            calculated = divide(num1,num2);
            break;
        default:
            console.log("ERROR IN OPERATOR!");
    }
    console.log("Calced: " + calculated);
    if(calculated == "You silly goose!") return "You silly goose!";
    return (Math.round(calculated*10)/10);

}

function addToDisplay(e){
    //This makes it so that when an operator is pressed it replaces the content, because its a placeholder
    removeOperatorBackground();
    if(operatorButtonPressed == true) {
        display.value = this.textContent;
        operationHappened = false;
        operatorButtonPressed = false;
        return;
    }
    operatorButtonPressed = false;

    //If one operation has already happened
    if(firstNum !== null && operationHappened == true) {
        display.value = this.textContent;
        operationHappened = false;
        return;
    }
    //special case if it's -0 because -08 looks stupid
    if(display.value == "-0") {
        display.value = "-" + this.textContent;
        return;
    }
    if(display.value == "0") {
        display.value = this.textContent;
        return;
    }
    display.value = display.value+this.textContent;
    lastOperationLastNum = display.value;
}

function clearAll(e){
    display.value = 0;
    removeOperatorBackground();
    firstNum = null;
    lastNum = null;
    operator = null;
    lastOperationLastNum = null;
    lastOperationFirstNum = null;
    lastOperationOperator = null;
}

function animateButton() {
    this.classList.remove("buttonAnimation");
    this.classList.add("buttonAnimation");
}

function stopButtonAnimation(){
    this.classList.remove("buttonAnimation");
}

//gets the pressed operator. Added to support "/".
function getOperator(e){
    let returnValue = "";
    if(e.target.textContent == "÷"){
        returnValue = "/";
    } else {
        returnValue = e.target.textContent;
    }
    return returnValue;
}

//Adds "clicked" operator background to it.
function addOperatorBackground(thisOperator) {
    thisOperator.classList.add("pressedOperator");
    thisOperator.classList.remove("operator");
}

//Removes "clicked" operator background from all of them
function removeOperatorBackground(){
    addButton.classList.remove("pressedOperator");
    addButton.classList.add("operator");

    minusButton.classList.remove("pressedOperator");
    minusButton.classList.add("operator");

    multiplyButton.classList.remove("pressedOperator");
    multiplyButton.classList.add("operator");

    divideButton.classList.remove("pressedOperator");
    divideButton.classList.add("operator");
}

//This is started if an operator is pressed and it calculates.
function operatorPressed(e){
    //if operator hasn't been pressed, then add display and operator to memory and return. 
    removeOperatorBackground();
    addOperatorBackground(this);
    console.log("Operator pressed firstNum:" + firstNum);
    console.log("Operator pressed display.value:" + display.value);
    console.log("Operator pressed operator:" + getOperator(e));

    lastOperationOperator = getOperator(e);

    console.log("Operator pressed lastOperationLastNum:" + lastOperationLastNum);
    console.log("Operator pressed lastOperationOperator:" + lastOperationOperator);

    if(operatorButtonPressed == true){
        operator = getOperator(e);
        console.log("2");
        return;
    }
    
    //Runs first operation
    if(operator == null) {
        operator = getOperator(e);
        firstNum = display.value;
        operatorButtonPressed = true;
        console.log("3");
        return;
    }

    if(operator !== getOperator(e)){
        console.log("3.5");
        let result = operate(operator, firstNum, display.value);
        firstNum = result;
        display.value = result;
        operator = getOperator(e);
        operatorButtonPressed = true;
        return;
    }

    if(firstNum !== null && operationHappened == false) {
        let result = operate(operator, firstNum, display.value);
        operator = getOperator(e);
        display.value = result;
        firstNum = display.value;
        operationHappened = true;
        operatorButtonPressed = true;
        console.log("4");
        
        return;
    }
    console.log("5");
    if(firstNum !== null && operationHappened == true) {
        return;
    }
    console.log("6");
};

function equalsPressed(e) {
    //Just operates based on memory values and display.value
    removeOperatorBackground();
    operatorButtonPressed = false;
    console.log("Equals pressed firstNum:" + firstNum);
    if(operator == null) return;
    if(lastOperationFirstNum == null) {
        console.log("lastOperationFirstNum")
        let resultFromCalc = operate(operator, firstNum, display.value);
        display.value = resultFromCalc;
        firstNum = display.value;
        operatorButtonPressed = true;
        return;
    } else {
        console.log("Else")
        let resultFromCalc = operate(lastOperationOperator, firstNum, lastOperationLastNum);
        display.value = resultFromCalc;
        firstNum = display.value;
        operatorButtonPressed = true;
        return;
    }
    
}

//Makes number plus or minus by multiplying with -1
function numberToPlusOrMinus(){
    if(display.value !== "0") {
        display.value = display.value * (-1);
    } else {
        display.value = "-0";
    }
}

function toPercent(){
    display.value = display.value/100;
}

function addDot(){
    if(!display.value.includes(".")){
        display.value = display.value + ".";
    }
}

function deleteLast(){
    if(display.value.length > 1){
        display.value = display.value.slice(0,-1);
    }
    if(display.value.length == 1){
        display.value = 0;
    }
}

//Needed variables for functionality
//firstNum is the number that is stored from the last screen
let firstNum = null;
//the operator that was called.
let operator = null;
let operationHappened = false;
let operatorButtonPressed = false;

let lastOperationLastNum = null;
let lastOperationFirstNum = null;
let lastOperationOperator = null;

//Get display value and add it to a variable that always has it.
let display = document.querySelector(".display");
display.value = 0;
let displayValue = display.value;


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

//Add backspace button and event for functionality
let backspaceButton = document.querySelector(".backspace");
backspaceButton.addEventListener("click",deleteLast);

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