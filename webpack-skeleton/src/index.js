
// GET OUR ELEMENTS
let first_number = document.querySelector('#first_number')
let second_number = document.querySelector('#sec_number')
let operation = document.querySelector('#operation')
let button = document.querySelector('#calculateit')
let cleanupbtn = document.querySelector('#cleanup')
let resultSpan = document.querySelector('#result_span')
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
    let result = 0;
    if(getOperation() == "+"){
         result = getFirstNumber()+getSecondNumber();
    }
    if(getOperation() == "-"){
         result = getFirstNumber()-getSecondNumber()
    }
    if(getOperation() == "/"){
         result = getFirstNumber()/getSecondNumber();
    }
    if(getOperation() == "*"){
         result = getFirstNumber()*getSecondNumber();
    }
    resultSpan.innerHTML = result;

}

cleanupbtn.onclick = function () { // sets everything to default values
    first_number.value = null;
    second_number.value = null;
    operation.selectedIndex = 0;
    resultSpan.innerHTML = 0;
}
