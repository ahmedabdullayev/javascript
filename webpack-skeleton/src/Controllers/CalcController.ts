import CalcBrain from "../Models/CalcBrain";

export default class CalcController {
    private calc: CalcBrain;
    private order: string;
    constructor(calcBrain : CalcBrain, order : string) {
        this.calc = calcBrain
        this.order = order;
    }

    showNum(num : string | null = "") {
        if (num != null) {
            document.querySelector<HTMLDivElement>("#monitor"+this.order)!.innerText = "";
            let nums = num + "";
            if(nums.indexOf(".") >= 0){
                document.querySelector<HTMLDivElement>("#monitor"+this.order)!.innerText = nums;
            }else{ // to not return number starting with 0
                document.querySelector<HTMLDivElement>("#monitor"+this.order)!.innerText = parseFloat(nums) + "";
            }
        } else {
            document.querySelector<HTMLDivElement>("#monitor"+this.order)!.innerText = "";
        }

    }

    setValues(number : number , dot = false, toplusorminus = false, clearnum = false) {

        if (this.calc.getNumberOne() == null && toplusorminus == false && clearnum == false) { // we are in first number scope and setting first number for it
            this.calc.setNumberOne(number + "");
            this.showNum(number.toString())
        } else if (this.calc.getPlus() == false && this.calc.getMinus() == false && this.calc.getDivide() == false
            && this.calc.getMultiply() == false && this.calc.getNumberOne() != null
            && this.calc.getResult() == null) {  // we are in first number scope and adding next numbers for it
            if (dot == true && this.calc!.getNumberOne()!.toString().indexOf(".") <= -1 && toplusorminus == false) {
                let numStr = this.calc.getNumberOne() + "."; // adding one dot
                this.calc.setNumberOne(numStr)
                this.showNum(numStr)
            } else if (dot == false && toplusorminus == false && clearnum == false) { // adding next numbers for first number
                let numStr = this.calc.getNumberOne() + "" + number;
                this.calc.setNumberOne(numStr)
                this.showNum(numStr)
            }
            if(toplusorminus == true){ // change num to positive or negative
               let num = this.calc.changeNumberNegativeOrPositive('first')
                this.showNum(num)
            }
            if(clearnum == true){
                let num = this.calc.clearNumber('first')
                this.showNum(num)
            }
        }
        if (this.calc.getNumberTwo() == null && (this.calc.getPlus() == true || this.calc.getMinus() == true
            || this.calc.getDivide() == true || this.calc.getMultiply() == true) && this.calc.getResult() == null && toplusorminus == false && clearnum == false) {
            this.calc.setNumberTwo(number + "");
            this.showNum(number.toString())
        } else if ((this.calc.getPlus() == true || this.calc.getMinus() == true || this.calc.getDivide() == true
            || this.calc.getMultiply() == true) && this.calc.getNumberTwo() != null && this.calc.getResult() == null) {
            if (dot == true && this.calc.getNumberTwo()!.toString().indexOf(".") <= -1 && toplusorminus == false) {
                let numStr = this.calc.getNumberTwo() + ".";
                this.calc.setNumberTwo(numStr)
                this.showNum(numStr)
            } else if (dot == false && toplusorminus == false && clearnum == false) {
                let numStr = this.calc.getNumberTwo() + "" + number;
                this.calc.setNumberTwo(numStr);
                this.showNum(numStr)
            }
            if(toplusorminus == true){
                let num = this.calc.changeNumberNegativeOrPositive('second')
                this.showNum(num)
            }
            if(clearnum == true){
                let num = this.calc.clearNumber('second')
                this.showNum(num)
            }
        }

        if (this.calc.getResult() != null && (this.calc.getPlus() == true || this.calc.getMinus() == true
                || this.calc.getDivide() == true || this.calc.getMultiply() == true)
            && this.calc.getAdditionalNumber() == null && toplusorminus == false) {
            this.calc.setAdditionalNumber(number + "");
            this.showNum(number.toString())
        } else if (this.calc.getResult() != null && (this.calc.getPlus() == true || this.calc.getMinus() == true
                || this.calc.getDivide() == true || this.calc.getMultiply() == true)
            && this.calc.getAdditionalNumber() != null) {
            if (dot == true && this.calc.getAdditionalNumber()!.toString().indexOf(".") <= -1 && toplusorminus == false) {
                let numStr = this.calc.getAdditionalNumber() + ".";
                this.calc.setAdditionalNumber(numStr)
                this.showNum(numStr)
            } else if (dot == false && toplusorminus == false && clearnum == false) {
                let numStr = this.calc.getAdditionalNumber() + "" + number;
                this.calc.setAdditionalNumber(numStr);
                this.showNum(numStr)
            }
            if(toplusorminus == true){
                let num = this.calc.changeNumberNegativeOrPositive('additional')
                this.showNum(num)
            }
            if(clearnum == true){
                let num = this.calc.clearNumber('additional')
                this.showNum(num)
            }
        }
    }

    doCalculations(operation : string) {
        let res = this.calc.doMath(operation)
        this.showNum(res)
    }

    toDefaultValues() {
        this.calc.setDefault();
        this.showNum(null)
    }

}