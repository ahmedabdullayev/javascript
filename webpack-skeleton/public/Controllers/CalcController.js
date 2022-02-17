export default class CalcController {
    constructor(calcBrain) {
        this.calc = calcBrain
    }

    showNum(num) {
        if (num != null) {
            document.querySelector("span").innerText = "";
            document.querySelector("span").innerText = num;
        } else {
            document.querySelector("span").innerText = "";
        }

    }

    setValues(event = null, dot = false, toplusorminus = false) {
        let number = 0;
        if (event != null) {
            number = parseFloat(event.target.closest('.num').getAttribute('number'));
        }
        if (this.calc.getNumberOne() == null) { // we are in first number scope and setting first number for it
            this.calc.setNumberOne(number + "");
            this.showNum(number)
        } else if (this.calc.getPlus() == false && this.calc.getMinus() == false && this.calc.getDivide() == false
            && this.calc.getMultiply() == false && this.calc.getNumberOne() != null
            && this.calc.getResult() == null) {  // we are in first number scope and adding next numbers for it
            if (dot == true && this.calc.getNumberOne().indexOf(".") <= -1 && toplusorminus == false) {
                let numStr = this.calc.getNumberOne() + "."; // adding one dot
                this.calc.setNumberOne(numStr)
                this.showNum(numStr)
            } else if (dot == false && toplusorminus == false) { // adding next numbers for first number
                let numStr = this.calc.getNumberOne() + "" + number;
                this.calc.setNumberOne(numStr)
                this.showNum(numStr)
            }
            if(toplusorminus == true){ // change num to positive or negative
               let num = this.calc.changeNumberNegativeOrPositive('first')
                this.showNum(num)
            }
        }
        if (this.calc.getNumberTwo() == null && (this.calc.getPlus() == true || this.calc.getMinus() == true
            || this.calc.getDivide() == true || this.calc.getMultiply() == true) && this.calc.getResult() == null) {
            this.calc.setNumberTwo(number + "");
            this.showNum(number)
        } else if ((this.calc.getPlus() == true || this.calc.getMinus() == true || this.calc.getDivide() == true
            || this.calc.getMultiply() == true) && this.calc.getNumberTwo() != null && this.calc.getResult() == null) {
            if (dot == true && this.calc.getNumberTwo().indexOf(".") <= -1 && toplusorminus == false) {
                let numStr = this.calc.getNumberTwo() + ".";
                this.calc.setNumberTwo(numStr)
                this.showNum(numStr)
            } else if (dot == false && toplusorminus == false) {
                let numStr = this.calc.getNumberTwo() + "" + number;
                this.calc.setNumberTwo(numStr);
                this.showNum(numStr)
            }
            if(toplusorminus == true){
                let num = this.calc.changeNumberNegativeOrPositive('second')
                this.showNum(num)
            }
        }

        if (this.calc.getResult() != null && (this.calc.getPlus() == true || this.calc.getMinus() == true
                || this.calc.getDivide() == true || this.calc.getMultiply() == true)
            && this.calc.getAdditionalNumber() == null) {
            this.calc.setAdditionalNumber(number + "");
            this.showNum(number)
        } else if (this.calc.getResult() != null && (this.calc.getPlus() == true || this.calc.getMinus() == true
                || this.calc.getDivide() == true || this.calc.getMultiply() == true)
            && this.calc.getAdditionalNumber() != null) {
            if (dot == true && this.calc.getAdditionalNumber().indexOf(".") <= -1 && toplusorminus == false) {
                let numStr = this.calc.getAdditionalNumber() + ".";
                this.calc.setAdditionalNumber(numStr)
                this.showNum(numStr)
            } else if (dot == false && toplusorminus == false) {
                let numStr = this.calc.getAdditionalNumber() + "" + number;
                this.calc.setAdditionalNumber(numStr);
                this.showNum(numStr)
            }
            if(toplusorminus == true){
                let num = this.calc.changeNumberNegativeOrPositive('additional')
                this.showNum(num)
            }
        }
    }

    doCalculations(operation) {
        let res = this.calc.doMath(operation)
        this.showNum(res)
    }

    toDefaultValues() {
        this.calc.setDefault();
        this.showNum(null)
    }

}