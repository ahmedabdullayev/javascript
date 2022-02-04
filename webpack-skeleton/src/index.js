
// GET OUR ELEMENTS
let first_number = document.querySelector('#first_number')
let second_number = document.querySelector('#sec_number')
let operation = document.querySelector('#operation')
let button = document.querySelector('#calculateit')

function getFirstNumber() {
   return parseFloat(first_number.value);
}

function getSecondNumber() {
    return parseFloat(second_number.value);
}

function getOperation() {
    return operation.value;
}

button.onclick = function () {
    let text = resultOf(getFirstNumber(), getSecondNumber(), getOperation())

    if(getOperation() == "+"){
        alert(text + getFirstNumber()+getSecondNumber()); //alerts result
    }
    if(getOperation() == "-"){
        alert(text + getFirstNumber()-getSecondNumber());
    }
    if(getOperation() == "/"){
        alert(text + getFirstNumber()/getSecondNumber());
    }
    if(getOperation() == "*"){
        alert(text + getFirstNumber()*getSecondNumber());
    }
}

function resultOf(num1, num2, operation) {
    return "Result of: " + num1 +" " + operation + " " + num2 +" = "
}