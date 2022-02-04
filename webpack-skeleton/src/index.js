
// GET OUR ELEMENTS
let first_number = document.querySelector('#first_number')
let second_number = document.querySelector('#sec_number')
let operation = document.querySelector('#operation')
let button = document.querySelector('#calculateit')

let cleanupbtn = document.querySelector('#cleanup')

//GETTERS
function getFirstNumber() {
   return parseFloat(first_number.value);
}

function getSecondNumber() {
    return parseFloat(second_number.value);
}

function getOperation() {
    return operation.value;
}

button.onclick = function () { // all the calculation happens here
    let text = resultOf(getFirstNumber(), getSecondNumber(), getOperation())

    if(getOperation() == "+"){
        let result = getFirstNumber()+getSecondNumber();
        alert(text + result); //alerts result
    }
    if(getOperation() == "-"){
        let result = getFirstNumber()-getSecondNumber()
        alert(text + result);
    }
    if(getOperation() == "/"){
        let result = getFirstNumber()/getSecondNumber();
        alert(text + result);
    }
    if(getOperation() == "*"){
        let result = getFirstNumber()*getSecondNumber();
        alert(text + result);
    }
}

function resultOf(num1, num2, operation) { // for alert text
    return "Result of: " + num1 +" " + operation + " " + num2 +" = "
}

cleanupbtn.onclick = function () { // sets everything to default values
    first_number.value = null;
    second_number.value = null;
    operation.selectedIndex = 0;
}
