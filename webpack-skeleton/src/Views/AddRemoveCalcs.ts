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
        let doc = document.querySelector('.quickmath'+order);
        doc!.addEventListener("click", (e: Event) => {
            const target = e.target as HTMLTextAreaElement;
            let num = parseFloat(target.closest('.num')!.getAttribute('number')!.toString())
            my_controller.setValues(num, false, false)
        })
        document.querySelector('.dot'+order)!.addEventListener("click", ()=> {
            my_controller.setValues(0, true, false)
        })
        let toplusorminus = document.querySelector('.toplusorminus'+order);
        toplusorminus!.addEventListener('click', ()=> {
            my_controller.setValues(0, false, true)
        });
        let clearNum = document.querySelector('.clearnum'+order);
        clearNum!.addEventListener('click', function (){
            my_controller.setValues(0, false, false, true)
        })
        let plusik = document.querySelector('.plusik'+order);
        plusik!.addEventListener('click', function () {
            my_controller.doCalculations('plus')
        })
        let minusik = document.querySelector('.minusik'+order);
        minusik!.addEventListener('click', function () {
            my_controller.doCalculations('minus')
        })
        let multiply = document.querySelector('.multiply'+order);
        multiply!.addEventListener('click', function () {
            my_controller.doCalculations('multiply')
        })
        let divide = document.querySelector('.divide'+order);
        divide!.addEventListener('click', function () {
            my_controller.doCalculations('divide')
        })
        let todefault = document.querySelector('.todefault'+order)
        todefault!.addEventListener('click', function () {
            my_controller.toDefaultValues()
        })
        let equals = document.querySelector('.equals'+order);
        equals!.addEventListener('click',function () {
            my_controller.doCalculations(my_calc.getLastOperation());
        })

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
        let removeCalc = document.body.querySelector(`#calc_0${calc}`);
        removeCalc!.remove()
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