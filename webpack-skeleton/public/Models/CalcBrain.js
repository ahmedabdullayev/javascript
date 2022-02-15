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

    doMath(operation) {
        if (operation == 'minus') {
            this.setMinusTrueOthersFalse()
            if (this.minus == true && this.numberOne != null && this.numberTwo != null && this.result == null) {
                this.result = this.numberOne - this.numberTwo;
                return this.result;
            } else if (this.minus == true && this.numberOne != null && this.numberTwo != null && this.result != null) {
                this.result = this.result - this.additionalNumber;
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