
let mathObj = {
    'numberOne': null,
    'numberTwo': null,
    'result': null,
    'additionalNumber': null
};
let operationClicked ={
    'plus': false,
    'minus': false,
    'divide': false,
    'multiply':false
}

document.querySelector('#quickmath').addEventListener("click", getValue)
function getValue (event){
   let number =  parseFloat(event.target.closest('.num').getAttribute('number'));
   if(mathObj.numberOne == null){
       mathObj.numberOne = number;
   }else if(operationClicked.plus == false && operationClicked.minus == false && mathObj.numberOne != null && mathObj.result == null){
       mathObj.numberOne += number +"";
       mathObj.numberOne = parseFloat(mathObj.numberOne)
   }
   if(mathObj.numberTwo == null && (operationClicked.plus == true || operationClicked.minus == true) && mathObj.result == null){
       mathObj.numberTwo = number;
   }else if((operationClicked.plus == true || operationClicked.minus == true)  && mathObj.numberTwo != null && mathObj.result == null){
       mathObj.numberTwo += number +"";
       mathObj.numberTwo = parseFloat(mathObj.numberTwo)
   }

   if(mathObj.result != null && (operationClicked.plus == true || operationClicked.minus == true)  && mathObj.additionalNumber == null){
       mathObj.additionalNumber = number;
       mathObj.additionalNumber = parseFloat(mathObj.additionalNumber)
   }else if(mathObj.result != null && (operationClicked.plus == true || operationClicked.minus == true)  && mathObj.additionalNumber != null){
       mathObj.additionalNumber += number + "";
       mathObj.additionalNumber = parseFloat(mathObj.additionalNumber)
   }
   console.log(mathObj)
}

document.querySelector('#plusik').onclick = function (){
    doMath('plus')
}
document.querySelector('#minusik').onclick = function (){
    doMath('minus')
}
document.querySelector('#equals').onclick = function (){
    let oper = Object.keys(operationClicked).filter(function (key){
         return operationClicked[key] === true ?? key;
    });
    doMath(oper);
}

function doMath(operation) {
    if(operation == 'minus'){
        setThisTrueOthersFalse('minus')
        if(operationClicked.minus == true && mathObj.numberOne != null && mathObj.numberTwo != null && mathObj.result == null){
            mathObj.result = mathObj.numberOne - mathObj.numberTwo;
            console.log(mathObj)
        }else if (operationClicked.minus == true && mathObj.numberOne != null && mathObj.numberTwo != null && mathObj.result != null){
            mathObj.result = mathObj.result - mathObj.additionalNumber;
            mathObj.additionalNumber = null;
            console.log(mathObj)
        }
    }else if(operation == 'plus'){
        setThisTrueOthersFalse('plus')
        if(operationClicked.plus == true && mathObj.numberOne != null && mathObj.numberTwo != null && mathObj.result == null){
            mathObj.result = mathObj.numberOne + mathObj.numberTwo;
            console.log(mathObj)
        }else if (operationClicked.plus == true && mathObj.numberOne != null && mathObj.numberTwo != null && mathObj.result != null){
            mathObj.result = mathObj.result + mathObj.additionalNumber;
            mathObj.additionalNumber = null;
            console.log(mathObj)
        }
    }
}


function setThisTrueOthersFalse(operation) {
    Object.keys(operationClicked).forEach(v => v != operation ? operationClicked[v] = false : operationClicked[v] = true);
    console.log(operationClicked)
}








// // GET OUR ELEMENTS
// let first_number = document.querySelector('#first_number')
// let second_number = document.querySelector('#sec_number')
// let operation = document.querySelector('#operation')
// let button = document.querySelector('#calculateit')
// let cleanupbtn = document.querySelector('#cleanup')
// let resultSpan = document.querySelector('#result_span')
// //GETTERS
// function getFirstNumber() {
//    return parseFloat(first_number.value);
// }
//
// function getSecondNumber() {
//     return parseFloat(second_number.value);
// }
//
// function getOperation() {
//     return operation.value;
// }
//
// button.onclick = function () { // all the calculation happens here
//     let result = 0;
//     if(getOperation() == "+"){
//          result = getFirstNumber()+getSecondNumber();
//     }
//     if(getOperation() == "-"){
//          result = getFirstNumber()-getSecondNumber()
//     }
//     if(getOperation() == "/"){
//          result = getFirstNumber()/getSecondNumber();
//     }
//     if(getOperation() == "*"){
//          result = getFirstNumber()*getSecondNumber();
//     }
//     resultSpan.innerHTML = result;
//
// }
//
// cleanupbtn.onclick = function () { // sets everything to default values
//     first_number.value = null;
//     second_number.value = null;
//     operation.selectedIndex = 0;
//     resultSpan.innerHTML = 0;
// }
