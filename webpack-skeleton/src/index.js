class CalcBrain{

    constructor() {
        //Numbers
        this.numberOne = null;
        this.numberTwo = null;
        this.result = null;
        this.additionalNumber = null;

        //Operations
        this.plus = false
        this.minus = false
        this.divide = false
        this.multiply = false

        this.lastOperation = '';
    }

    getNumberOne(){
        return this.numberOne;
    }
    setNumberOne(num){
        this.numberOne = num;
    }
    getNumberTwo(){
        return this.numberTwo;
    }
    setNumberTwo(num){
        this.numberTwo = num;
    }
    getResult(){
        return this.result;
    }
    getAdditionalNumber(){
        return this.additionalNumber;
    }
    setAdditionalNumber(num){
        this.additionalNumber = num;
    }
    setDefault(){
        this.numberOne = null;
        this.numberTwo = null;
        this.result = null;
        this.additionalNumber = null;
        this.plus = false
        this.minus = false
        this.divide = false
        this.multiply = false
        this.lastOperation = '';
    }
    doMath(operation){
        if(operation == 'minus'){
            this.setMinusTrueOthersFalse()
            if(this.minus == true && this.numberOne != null && this.numberTwo != null && this.result == null){
                this.result = this.numberOne - this.numberTwo;
                return this.result;
            }else if (this.minus == true && this.numberOne != null && this.numberTwo != null && this.result != null){
                this.result = this.result - this.additionalNumber;
                this.additionalNumber = null;
                return this.result;
            }
        }else if(operation == 'plus'){
            console.log("ples")
            this.setPlusTrueOthersFalse()
            if(this.plus == true && this.numberOne != null && this.numberTwo != null && this.result == null){
                this.result = parseFloat(this.numberOne) + parseFloat(this.numberTwo);
                return this.result;
            }else if (this.plus == true && this.numberOne != null && this.numberTwo != null && this.result != null && this.additionalNumber != null){
                this.result = parseFloat(this.result) + parseFloat(this.additionalNumber);
                this.additionalNumber = null;
                return this.result;
            }
        }else if(operation == 'divide'){
            this.setDivideTrueOthersFalse()
            if(this.divide == true && this.numberOne != null && this.numberTwo != null && this.result == null){
                this.result = parseFloat(this.numberOne) / parseFloat(this.numberTwo);
                return this.result;
            }else if (this.divide == true && this.numberOne != null && this.numberTwo != null && this.result != null && this.additionalNumber != null){
                this.result = parseFloat(this.result) / parseFloat(this.additionalNumber);
                this.additionalNumber = null;
                return this.result;
            }
        }else if(operation == 'multiply'){
            this.setMultiplyTrueOthersFalse()
            if(this.multiply == true && this.numberOne != null && this.numberTwo != null && this.result == null){
                this.result = parseFloat(this.numberOne) * parseFloat(this.numberTwo);
                return this.result;
            }else if (this.multiply == true && this.numberOne != null && this.numberTwo != null && this.result != null && this.additionalNumber != null){
                this.result = parseFloat(this.result) * parseFloat(this.additionalNumber);
                this.additionalNumber = null;
                return this.result;
            }
        }
        return this.result;
    }
    getPlus(){
        return this.plus;
    }
    getMinus(){
        return this.minus;
    }
    getMultiply(){
        return this.multiply;
    }
    getDivide(){
        return this.divide;
    }

    getLastOperation(){
        return this.lastOperation;
    }
    setPlusTrueOthersFalse(){
        this.plus = true;
        this.lastOperation = 'plus'

        this.minus = false;
        this.multiply = false;
        this.divide = false;
    }

    setMinusTrueOthersFalse(){
        this.minus = true;
        this.lastOperation = 'minus'

        this.plus = false;
        this.multiply = false;
        this.divide = false;
    }

    setMultiplyTrueOthersFalse(){
        this.multiply = true;
        this.lastOperation = 'multiply'

        this.plus = false;
        this.minus = false;
        this.divide = false;
    }

    setDivideTrueOthersFalse(){
        this.divide = true;
        this.lastOperation = 'divide'

        this.plus = false;
        this.minus = false;
        this.multiply = false;
    }



}


function MainView(btns){
    let content = document.createElement('div');
    content.classList = "card text-center w-50";
    content.style.margin = "auto";
    let spanDiv = document.createElement('div');
    spanDiv.classList = "card-header bg-dark w-100 h-100";
    content.append(spanDiv)
    let span = document.createElement('span');
    span.classList = "d-block p-2 bg-dark text-white";
    span.style.height = "24px";
    spanDiv.append(span)

    let body = document.createElement('div');
    body.classList = "card-body";
    content.append(body)

    let btnGroup = document.createElement('div');
    btnGroup.classList = "btn-group w-100 justify-content-center";
    btnGroup.id = "quickmath";

    btnGroup.innerHTML= btns;
    body.append(btnGroup);

    let footer = document.createElement('div');
    footer.classList = "card-footer";

    let plus = document.createElement('button');
    plus.classList = "btn btn-success";
    plus.id = "plusik";
    plus.innerText = "+";

    let minus = document.createElement('button');
    minus.classList = "btn btn-success";
    minus.id = "minusik";
    minus.innerText = "-";


    let equals = document.createElement('button');
    equals.classList = "btn btn-success";
    equals.id = "equals";
    equals.innerText = "=";

    let multiply = document.createElement('button');
    multiply.classList = "btn btn-success";
    multiply.id = "multiply";
    multiply.innerText = "*";

    let divide = document.createElement('button');
    divide.classList = "btn btn-success";
    divide.id = "divide";
    divide.innerText = "/";

    let todefault = document.createElement('button');
    todefault.classList = "btn btn-warning";
    todefault.id = "todefault";
    todefault.innerText = "C";

    let dot = document.createElement('button');
    dot.classList = "btn btn-secondary";
    dot.style.marginRight = "30px";
    dot.id = "dot";
    dot.innerText = ".";

    footer.append(dot)
    footer.append(plus)
    footer.append(divide)
    footer.append(minus)
    footer.append(multiply)
    footer.append(equals)
    footer.append(todefault)

    content.append(footer)

    return content;
}
function NumberButtonsView() {
    let numberButtons = "";
    let iter = 0;
    for (let i = 0; i < 3; i++) {
        numberButtons = numberButtons + '<div class="btn-group-vertical w-100">';
        for(let j = 0; j < 3; j++){
            numberButtons = numberButtons + `<button class="btn btn-primary num" value="${iter}" number="${iter}">${iter}</button>`
            iter++;
            if(iter == 8){
                numberButtons = numberButtons + `<button class="btn btn-primary num" value="${iter}" number="${iter}">${iter}</button>`
                iter++;
            }
        }
        numberButtons = numberButtons + '</div>';
    }

    return numberButtons;

}


class CalcController {
    constructor(calcBrain) {
        this.calc = calcBrain
    }
    showNum(num){
        if(num!= null) {
            document.querySelector("span").innerText = "";
            document.querySelector("span").innerText = num;
        }else{
            document.querySelector("span").innerText = "";
        }

    }

    setValues(event = null, dot = false){
        let number;
        if(event != null){
            number =  parseFloat(event.target.closest('.num').getAttribute('number'));
        }
        if(this.calc.getNumberOne() == null){
            this.calc.setNumberOne(number+"");
            this.showNum(number)
        }else if(this.calc.getPlus() == false && this.calc.getMinus() == false && this.calc.getDivide() == false && this.calc.getMultiply() == false && this.calc.getNumberOne() != null && this.calc.getResult() == null){
            if(dot == true && this.calc.getNumberOne().indexOf(".") <= -1 ){
                let numStr = this.calc.getNumberOne() +".";
                this.calc.setNumberOne(numStr)
                this.showNum(numStr)
            }else if(typeof number == 'number'){
                let numStr = this.calc.getNumberOne() + "" + number;
                this.calc.setNumberOne(numStr)
                this.showNum(numStr)
            }
        }
        if(this.calc.getNumberTwo() == null && (this.calc.getPlus() == true || this.calc.getMinus() == true || this.calc.getDivide() == true || this.calc.getMultiply() == true) && this.calc.getResult() == null){
            this.calc.setNumberTwo(number+"");
            this.showNum(number)
        }else if((this.calc.getPlus() == true || this.calc.getMinus() == true || this.calc.getDivide() == true || this.calc.getMultiply() == true)  && this.calc.getNumberTwo() != null && this.calc.getResult() == null){
            if(dot == true && this.calc.getNumberTwo().indexOf(".") <= -1 ){
                let numStr = this.calc.getNumberTwo() +".";
                this.calc.setNumberTwo(numStr)
                this.showNum(numStr)
            }else if(typeof number == 'number') {
                let numStr = this.calc.getNumberTwo() + "" + number;
                this.calc.setNumberTwo(numStr);
                this.showNum(numStr)
            }
        }

        if(this.calc.getResult() != null && (this.calc.getPlus() == true || this.calc.getMinus() == true || this.calc.getDivide() == true || this.calc.getMultiply() == true)  && this.calc.getAdditionalNumber() == null){
            console.log('here')
            this.calc.setAdditionalNumber(number+"");
            this.showNum(number)
        }else if(this.calc.getResult() != null && (this.calc.getPlus() == true || this.calc.getMinus() == true || this.calc.getDivide() == true || this.calc.getMultiply() == true)  && this.calc.getAdditionalNumber() != null){
            if(dot == true && this.calc.getAdditionalNumber().indexOf(".") <= -1 ){
                let numStr = this.calc.getAdditionalNumber() +".";
                this.calc.setAdditionalNumber(numStr)
                this.showNum(numStr)
            }else if(typeof number == 'number') {
                let numStr = this.calc.getAdditionalNumber() + "" + number;
                this.calc.setAdditionalNumber(numStr);
                this.showNum(numStr)
            }
        }
    }

    doCalculations(operation){
        let res = this.calc.doMath(operation)
        this.showNum(res)
    }
    toDefaultValues(){
        this.calc.setDefault();
        this.showNum(null)
    }

}

let btnsView = NumberButtonsView();
let viewer = MainView(btnsView);

let my_calc = new CalcBrain();
let my_controller = new CalcController(my_calc);
document.querySelector('.container').appendChild(viewer)

document.querySelector('#quickmath').addEventListener("click", (e) =>{
    my_controller.setValues(e)
})

document.querySelector('#dot').addEventListener("click", (e) =>{
    my_controller.setValues(null, true)
})


document.querySelector('#plusik').onclick = function (){
    my_controller.doCalculations('plus')
}
document.querySelector('#minusik').onclick = function (){
    my_controller.doCalculations('minus')
}
document.querySelector('#multiply').onclick = function (){
    my_controller.doCalculations('multiply')
}
document.querySelector('#divide').onclick = function (){
    my_controller.doCalculations('divide')
}
document.querySelector('#todefault').onclick = function (){
    my_controller.toDefaultValues()
}

document.querySelector('#equals').onclick = function (){
    my_controller.doCalculations(my_calc.getLastOperation());
}





