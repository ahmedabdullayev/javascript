export default class CalcBrain {
    private numberOne: number | string | null;
    private numberTwo: number | string | null;
    private result: number | string | null;
    private additionalNumber: number | string | null;
    private plus: boolean;
    private minus: boolean;
    private divide: boolean;
    private multiply: boolean;
    private lastOperation: string;

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

    setNumberOne(num : string) {
        this.numberOne = num;
    }

    getNumberTwo() {
        return this.numberTwo;
    }

    setNumberTwo(num : string) {
        this.numberTwo = num;
    }

    getResult() {
        return this.result;
    }

    getAdditionalNumber() {
        return this.additionalNumber;
    }

    setAdditionalNumber(num : string) {
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
    changeNumberNegativeOrPositive(number : string){
        if(number == "first" && this.numberOne != null) {
            if (typeof this.numberOne !== "number" && this.numberOne?.indexOf("-") >= 0) {
                this.numberOne = this.numberOne.substring(1)
            } else {
                this.numberOne = "-" + this.numberOne
            }
            return this.numberOne
        }
        if(number == "second" && this.numberTwo != null) {
            if (typeof this.numberTwo !== "number" && this.numberTwo?.indexOf("-") >= 0) {
                this.numberTwo = this.numberTwo.substring(1)
            } else {
                this.numberTwo = "-" + this.numberTwo
            }
            return this.numberTwo
        }
        if(number == "additional" && this.additionalNumber != null) {
            if (typeof this.additionalNumber !== "number" && this.additionalNumber?.indexOf("-") >= 0) {
                this.additionalNumber = this.additionalNumber.substring(1)
            } else {
                this.additionalNumber = "-" + this.additionalNumber
            }
            return this.additionalNumber
        }
        return "";
    }
    clearNumber(number : string){
        if(number == "first" && this.numberOne != null) {
            if (typeof this.numberOne !== "number" && this.numberOne?.replace(/\D/g, '').length > 1) {
                this.numberOne = this.numberOne.substring(0, this.numberOne.length - 1)
            } else {
                this.numberOne = "0";
            }
            return this.numberOne
        }
        if(number == "second" && this.numberTwo != null) {
            if (typeof this.numberTwo !== "number" && this.numberTwo?.replace(/\D/g, '').length > 1) {
                this.numberTwo = this.numberTwo.substring(0, this.numberTwo.length - 1)
            } else {
                this.numberTwo = "0";
            }
            return this.numberTwo
        }
        if(number == "additional" && this.additionalNumber != null) {
            if (typeof this.additionalNumber !== "number" && this.additionalNumber?.replace(/\D/g, '').length > 1) {
                this.additionalNumber = this.additionalNumber.substring(0, this.additionalNumber.length - 1)
            } else {
                this.additionalNumber = "0";
            }
            return this.additionalNumber
        }

        return "";

    }
    doMath(operation : string) : string | null {
        if (operation == 'minus') {
            this.setMinusTrueOthersFalse()
            if (this.minus == true && this.numberOne != null && this.numberTwo != null && this.result == null) {
                this.numberOne = this.numberOne.toString();
                this.numberTwo = this.numberTwo.toString();
                    this.result = parseFloat(this.numberOne) - parseFloat(this.numberTwo);
                return this.result!.toString();
            } else if (this.minus == true && this.numberOne != null && this.numberTwo != null && this.result != null
                && this.additionalNumber != null) {
                this.additionalNumber = this.additionalNumber.toString()
                this.result = this.result.toString();
                    this.result = parseFloat(this.result) - parseFloat(this.additionalNumber);
                this.additionalNumber = null;
                return this.result!.toString();
            }
        } else if (operation == 'plus') {
            console.log("ples")
            this.setPlusTrueOthersFalse()
            if (this.plus == true && this.numberOne != null && this.numberTwo != null && this.result == null) {
                this.numberOne = this.numberOne.toString();
                this.numberTwo = this.numberTwo.toString();
                    this.result = parseFloat(this.numberOne) + parseFloat(this.numberTwo);
                return this.result!.toString();
            } else if (this.plus == true && this.numberOne != null && this.numberTwo != null && this.result != null
                && this.additionalNumber != null) {
                this.additionalNumber = this.additionalNumber.toString()
                this.result = this.result.toString();
                this.result = parseFloat(this.result) + parseFloat(this.additionalNumber);
                this.additionalNumber = null;
                return this.result!.toString();
            }
        } else if (operation == 'divide') {
            this.setDivideTrueOthersFalse()
            if (this.divide == true && this.numberOne != null && this.numberTwo != null && this.result == null) {
                this.numberOne = this.numberOne.toString();
                this.numberTwo = this.numberTwo.toString();
                    this.result = parseFloat(this.numberOne) / parseFloat(this.numberTwo);
                return this.result!.toString();
            } else if (this.divide == true && this.numberOne != null && this.numberTwo != null && this.result != null
                && this.additionalNumber != null) {
                this.additionalNumber = this.additionalNumber.toString()
                this.result = this.result.toString();
                    this.result = parseFloat(this.result) / parseFloat(this.additionalNumber);
                this.additionalNumber = null;
                return this.result!.toString();
            }
        } else if (operation == 'multiply') {
            this.setMultiplyTrueOthersFalse()
            if (this.multiply == true && this.numberOne != null && this.numberTwo != null && this.result == null) {
                this.numberOne = this.numberOne.toString();
                this.numberTwo = this.numberTwo.toString();
                    this.result = parseFloat(this.numberOne) * parseFloat(this.numberTwo);
                return this.result!.toString();
            } else if (this.multiply == true && this.numberOne != null && this.numberTwo != null && this.result != null
                && this.additionalNumber != null) {
                this.additionalNumber = this.additionalNumber.toString()
                this.result = this.result.toString();
                    this.result = parseFloat(this.result) * parseFloat(this.additionalNumber);
                this.additionalNumber = null;
                return this.result!.toString();
            }
        }
        console.warn("here: ", operation)
        if(this.result == null){
            return null;
        }
        return this.result!.toString();
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