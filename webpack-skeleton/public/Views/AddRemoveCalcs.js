import NumberButtonsView from "./NumberButtonsView";
import MainView from "./MainView";
import CalcBrain from "../Models/CalcBrain";
import CalcController from "../Controllers/CalcController";

export default class AddRemoveCalcs {
    constructor() {
        this.globalCounter = 0;
    }
    addNewCalc(globalNum) {
        let order = "_0"+globalNum;

        let btnsView = NumberButtonsView();
        let viewer = MainView(btnsView, order);

        let my_calc = new CalcBrain();
        let my_controller = new CalcController(my_calc, order);
        document.body.appendChild(viewer)

        document.querySelector('.quickmath'+order).addEventListener("click", (e) => {
            my_controller.setValues(e, false, false)
        })
        document.querySelector('.dot'+order).addEventListener("click", (e) => {
            my_controller.setValues(null, true, false)
        })
        document.querySelector('.toplusorminus'+order).onclick= function (){
            my_controller.setValues(null, false, true)
        }
        document.querySelector('.clearnum'+order).onclick= function (){
            my_controller.setValues(null, false, false, true)
        }

        document.querySelector('.plusik'+order).onclick = function () {
            my_controller.doCalculations('plus')
        }
        document.querySelector('.minusik'+order).onclick = function () {
            my_controller.doCalculations('minus')
        }
        document.querySelector('.multiply'+order).onclick = function () {
            my_controller.doCalculations('multiply')
        }
        document.querySelector('.divide'+order).onclick = function () {
            my_controller.doCalculations('divide')
        }
        document.querySelector('.todefault'+order).onclick = function () {
            my_controller.toDefaultValues()
        }

        document.querySelector('.equals'+order).onclick = function () {
            my_controller.doCalculations(my_calc.getLastOperation());
        }

    }
    addCalc(){
        let buttonAdd = document.createElement("button");
        buttonAdd.textContent = "Add Calc";
        buttonAdd.classList = "btn btn-primary"
        document.body.appendChild(buttonAdd)
        buttonAdd.onclick = () => {
            this.globalCounter++;
            this.addNewCalc(this.globalCounter);
        }
    }
    removeOldCalc(calc) {
        document.body.querySelector(`#calc_0${calc}`).remove()
    }
    removeCalc(){
        let buttonRemove = document.createElement("button");
        buttonRemove.textContent = "Remove Calc";
        buttonRemove.classList = "btn btn-warning"
        document.body.appendChild(buttonRemove)
        buttonRemove.onclick = () => {
            this.removeOldCalc(this.globalCounter);
            this.globalCounter--;
        }
    }

}