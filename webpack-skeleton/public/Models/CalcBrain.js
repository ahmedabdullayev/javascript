export default class CalcBrain {

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

    getNumberOne() {
        return this.numberOne;
    }

    setNumberOne(num) {
        this.numberOne = num;
    }

    getNumberTwo() {
        return this.numberTwo;
    }

    setNumberTwo(num) {
        this.numberTwo = num;
    }

    getResult() {
        return this.result;
    }

    getAdditionalNumber() {
        return this.additionalNumber;
    }

    setAdditionalNumber(num) {
        this.additionalNumber = num;
    }

    setDefault() {
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
    changeNumberNegativeOrPositive(number){
        if(number == "first" && this.numberOne != null) {
            if (this.numberOne.indexOf("-") >= 0) {
                this.numberOne = this.numberOne.substring(1)
            } else {
                this.numberOne = "-" + this.numberOne
            }
            return this.numberOne
        }
        if(number == "second" && this.numberTwo != null) {
            if (this.numberTwo.indexOf("-") >= 0) {
                this.numberTwo = this.numberTwo.substring(1)
            } else {
                this.numberTwo = "-" + this.numberTwo
            }
            return this.numberTwo
        }
        if(number == "additional" && this.additionalNumber != null) {
            if (this.additionalNumber.indexOf("-") >= 0) {
                this.additionalNumber = this.additionalNumber.substring(1)
            } else {
                this.additionalNumber = "-" + this.additionalNumber
            }
            return this.additionalNumber
        }
        return "";
    }
    clearNumber(number){
        if(number == "first" && this.numberOne != null) {
            if (this.numberOne.replace(/\D/g,'').length > 1) {
                this.numberOne = this.numberOne.substring(0, this.numberOne.length - 1)
            } else {
                this.numberOne = "0";
            }
            return this.numberOne
        }
        if(number == "second" && this.numberTwo != null) {
            if (this.numberTwo.replace(/\D/g,'').length > 1) {
                this.numberTwo = this.numberTwo.substring(0, this.numberTwo.length - 1)
            } else {
                this.numberTwo = "0";
            }
            return this.numberTwo
        }
        if(number == "additional" && this.additionalNumber != null) {
            if (this.additionalNumber.replace(/\D/g,'').length > 1) {
                this.additionalNumber = this.additionalNumber.substring(0, this.additionalNumber.length - 1)
            } else {
                this.additionalNumber = "0";
            }
            return this.additionalNumber
        }

        return "";

    }
    doMath(operation) {
        if (operation == 'minus') {
            this.setMinusTrueOthersFalse()
            if (this.minus == true && this.numberOne != null && this.numberTwo != null && this.result == null) {
                this.result = parseFloat(this.numberOne) - parseFloat(this.numberTwo);
                return this.result;
            } else if (this.minus == true && this.numberOne != null && this.numberTwo != null && this.result != null
                && this.additionalNumber != null) {
                this.result = parseFloat(this.result) - parseFloat(this.additionalNumber);
                this.additionalNumber = null;
                return this.result;
            }
        } else if (operation == 'plus') {
            console.log("ples")
            this.setPlusTrueOthersFalse()
            if (this.plus == true && this.numberOne != null && this.numberTwo != null && this.result == null) {
                this.result = parseFloat(this.numberOne) + parseFloat(this.numberTwo);
                return this.result;
            } else if (this.plus == true && this.numberOne != null && this.numberTwo != null && this.result != null
                && this.additionalNumber != null) {
                this.result = parseFloat(this.result) + parseFloat(this.additionalNumber);
                this.additionalNumber = null;
                return this.result;
            }
        } else if (operation == 'divide') {
            this.setDivideTrueOthersFalse()
            if (this.divide == true && this.numberOne != null && this.numberTwo != null && this.result == null) {
                this.result = parseFloat(this.numberOne) / parseFloat(this.numberTwo);
                return this.result;
            } else if (this.divide == true && this.numberOne != null && this.numberTwo != null && this.result != null
                && this.additionalNumber != null) {
                this.result = parseFloat(this.result) / parseFloat(this.additionalNumber);
                this.additionalNumber = null;
                return this.result;
            }
        } else if (operation == 'multiply') {
            this.setMultiplyTrueOthersFalse()
            if (this.multiply == true && this.numberOne != null && this.numberTwo != null && this.result == null) {
                this.result = parseFloat(this.numberOne) * parseFloat(this.numberTwo);
                return this.result;
            } else if (this.multiply == true && this.numberOne != null && this.numberTwo != null && this.result != null
                && this.additionalNumber != null) {
                this.result = parseFloat(this.result) * parseFloat(this.additionalNumber);
                this.additionalNumber = null;
                return this.result;
            }
        }
        return this.result;
    }

    getPlus() {
        return this.plus;
    }

    getMinus() {
        return this.minus;
    }

    getMultiply() {
        return this.multiply;
    }

    getDivide() {
        return this.divide;
    }

    getLastOperation() {
        return this.lastOperation;
    }

    setPlusTrueOthersFalse() {
        this.plus = true;
        this.lastOperation = 'plus'

        this.minus = false;
        this.multiply = false;
        this.divide = false;
    }

    setMinusTrueOthersFalse() {
        this.minus = true;
        this.lastOperation = 'minus'

        this.plus = false;
        this.multiply = false;
        this.divide = false;
    }

    setMultiplyTrueOthersFalse() {
        this.multiply = true;
        this.lastOperation = 'multiply'

        this.plus = false;
        this.minus = false;
        this.divide = false;
    }

    setDivideTrueOthersFalse() {
        this.divide = true;
        this.lastOperation = 'divide'

        this.plus = false;
        this.minus = false;
        this.multiply = false;
    }


}