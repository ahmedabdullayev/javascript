import CalcBrain from "../public/Models/CalcBrain";
import MainView from "../public/Views/MainView";
import NumberButtonsView from "../public/Views/NumberButtonsView";
import CalcController from "../public/Controllers/CalcController";

let btnsView = NumberButtonsView();
let viewer = MainView(btnsView);

let my_calc = new CalcBrain();
let my_controller = new CalcController(my_calc);
document.querySelector('.container').appendChild(viewer)

document.querySelector('#quickmath').addEventListener("click", (e) => {
    my_controller.setValues(e, false, false)
})
document.querySelector('#dot').addEventListener("click", (e) => {
    my_controller.setValues(null, true, false)
})
document.querySelector('#toplusorminus').onclick= function (){
    my_controller.setValues(null, false, true)
}
document.querySelector('#clearnum').onclick= function (){
    my_controller.setValues(null, false, false, true)
}

document.querySelector('#plusik').onclick = function () {
    my_controller.doCalculations('plus')
}
document.querySelector('#minusik').onclick = function () {
    my_controller.doCalculations('minus')
}
document.querySelector('#multiply').onclick = function () {
    my_controller.doCalculations('multiply')
}
document.querySelector('#divide').onclick = function () {
    my_controller.doCalculations('divide')
}
document.querySelector('#todefault').onclick = function () {
    my_controller.toDefaultValues()
}


document.querySelector('#equals').onclick = function () {
    my_controller.doCalculations(my_calc.getLastOperation());
}





