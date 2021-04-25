const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
    // Overwrite `displayValue` if the current value is '0' otherwise append to it
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else{
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    console.log(calculator);
}

function inputDecimal(dot) {
    if (!calculator.displayValue.includes(dot)){
        //append decimal point
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    // parsefloat converts the string content of displayValue to a floating-point number
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand){
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }

    // verify the firstOperand is null and the value is not NaN
    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if(operator){
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}

function calculate (firstOperand, secondOperand, operator) {
    if(operator === "+"){
        return firstOperand + secondOperand;
    } else if (operator === "-"){
        return firstOperand - secondOperand;
    } else if (operator === "*"){
        return firstOperand * secondOperand;
    } else if(operator === "/"){
        return firstOperand / secondOperand;
    }

    return secondOperand;
}

function resetCalculator(){
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}

function updateScreen() {
    // select the element with class of `calculator-screen`
    const display = document.querySelector('.calculator-screen');
    // update the value of the element with the contents of `displayValue`
    display.value = calculator.displayValue;
  }
  
updateScreen();
  

const keys = document.querySelector('#calculator-keys');
keys.addEventListener('click', (event) => {
  // Access the clicked element
  const { target } = event;

  // Check if the clicked element is a button.
  // If not, exit from the function
  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('operator')) {
    handleOperator(target.value);
    updateScreen();
    return;
  }

  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
    updateScreen();
    return;
  }

  if (target.classList.contains('all-clear')) {
    resetCalculator();
    updateScreen();
    return;
  }

  inputDigit(target.value);
  updateScreen();
});