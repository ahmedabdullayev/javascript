import NumberButtonsView from "./NumberButtonsView";
import MainView from "./MainView";
import CalcBrain from "../Models/CalcBrain";
import CalcController from "../Controllers/CalcController";

export default class AddRemoveCalcs {
    private globalCounter: number;
    constructor() {
        this.globalCounter = 0;
    }
    addNewCalc(globalNum : number) {
        let order = "_0"+globalNum;

        let btnsView = NumberButtonsView();
        let viewer = MainView(btnsView, order);

        let my_calc = new CalcBrain();
        let my_controller = new CalcController(my_calc, order);
        document.body.appendChild(viewer)

        document.querySelector('.quickmath'+order)!.addEventListener("click", (e: Event) => {
            const target = e.target as HTMLTextAreaElement;
            let num = parseFloat(target.closest('.num')!.getAttribute('number')!.toString())
            my_controller.setValues(num, false, false)
        })
        document.querySelector('.dot'+order)!.addEventListener("click", ()=> {
            my_controller.setValues(0, true, false)
        })
        document.querySelector<HTMLDivElement>('.toplusorminus'+order)!.onclick= function (){
            my_controller.setValues(0, false, true)
        }
        document.querySelector<HTMLDivElement>('.clearnum'+order)!.onclick= function (){
            my_controller.setValues(0, false, false, true)
        }

        document.querySelector<HTMLDivElement>('.plusik'+order)!.onclick = function () {
            my_controller.doCalculations('plus')
        }
        document.querySelector<HTMLDivElement>('.minusik'+order)!.onclick = function () {
            my_controller.doCalculations('minus')
        }
        document.querySelector<HTMLDivElement>('.multiply'+order)!.onclick = function () {
            my_controller.doCalculations('multiply')
        }
        document.querySelector<HTMLDivElement>('.divide'+order)!.onclick = function () {
            my_controller.doCalculations('divide')
        }
        document.querySelector<HTMLDivElement>('.todefault'+order)!.onclick = function () {
            my_controller.toDefaultValues()
        }

        document.querySelector<HTMLDivElement>('.equals'+order)!.onclick = function () {
            my_controller.doCalculations(my_calc.getLastOperation());
        }

    }
    addCalc(){
        let buttonAdd = document.createElement("button");
        buttonAdd.textContent = "Add Calc";
        buttonAdd.className = "btn btn-primary"
        document.body.appendChild(buttonAdd)
        buttonAdd.onclick = () => {
            this.globalCounter++;
            this.addNewCalc(this.globalCounter);
        }
    }
    removeOldCalc(calc:string) {
        document.body.querySelector<HTMLDivElement>(`#calc_0${calc}`)!.remove()
    }
    removeCalc(){
        let buttonRemove = document.createElement("button");
        buttonRemove.textContent = "Remove Calc";
        buttonRemove.className = "btn btn-warning"
        document.body.appendChild(buttonRemove)
        buttonRemove.onclick = () => {
            this.removeOldCalc(this.globalCounter.toString());
            this.globalCounter--;
        }
    }

}