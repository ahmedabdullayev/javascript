import CalcBrain from "../public/Models/CalcBrain";
import MainView from "../public/Views/MainView";
import NumberButtonsView from "../public/Views/NumberButtonsView";
import CalcController from "../public/Controllers/CalcController";

// let btnsView = NumberButtonsView();
// let viewer = MainView(btnsView);
//
// let my_calc = new CalcBrain();
// let my_controller = new CalcController(my_calc);
// document.querySelector('.container').appendChild(viewer)
//
// document.querySelector('#quickmath').addEventListener("click", (e) => {
//     my_controller.setValues(e, false, false)
// })
// document.querySelector('#dot').addEventListener("click", (e) => {
//     my_controller.setValues(null, true, false)
// })
// document.querySelector('#toplusorminus').onclick= function (){
//     my_controller.setValues(null, false, true)
// }
// document.querySelector('#clearnum').onclick= function (){
//     my_controller.setValues(null, false, false, true)
// }
//
// document.querySelector('#plusik').onclick = function () {
//     my_controller.doCalculations('plus')
// }
// document.querySelector('#minusik').onclick = function () {
//     my_controller.doCalculations('minus')
// }
// document.querySelector('#multiply').onclick = function () {
//     my_controller.doCalculations('multiply')
// }
// document.querySelector('#divide').onclick = function () {
//     my_controller.doCalculations('divide')
// }
// document.querySelector('#todefault').onclick = function () {
//     my_controller.toDefaultValues()
// }
//
// document.querySelector('#equals').onclick = function () {
//     my_controller.doCalculations(my_calc.getLastOperation());
// }




function addNewGame(globalNum) {

let order = "_0"+globalNum;

let btnsView_01 = NumberButtonsView();
let viewer_01 = MainView(btnsView_01, order);

let my_calc_01 = new CalcBrain();
let my_controller_01 = new CalcController(my_calc_01, order);
document.querySelector('.container').appendChild(viewer_01)

document.querySelector('#quickmath'+order).addEventListener("click", (e) => {
    my_controller_01.setValues(e, false, false)
})
document.querySelector('#dot'+order).addEventListener("click", (e) => {
    my_controller_01.setValues(null, true, false)
})
document.querySelector('#toplusorminus'+order).onclick= function (){
    my_controller_01.setValues(null, false, true)
}
document.querySelector('#clearnum'+order).onclick= function (){
    my_controller_01.setValues(null, false, false, true)
}

document.querySelector('#plusik'+order).onclick = function () {
    my_controller_01.doCalculations('plus')
}
document.querySelector('#minusik'+order).onclick = function () {
    my_controller_01.doCalculations('minus')
}
document.querySelector('#multiply'+order).onclick = function () {
    my_controller_01.doCalculations('multiply')
}
document.querySelector('#divide'+order).onclick = function () {
    my_controller_01.doCalculations('divide')
}
document.querySelector('#todefault'+order).onclick = function () {
    my_controller_01.toDefaultValues()
}

document.querySelector('#equals'+order).onclick = function () {
    my_controller_01.doCalculations(my_calc_01.getLastOperation());
}

}

let globalNum = 0;

let buttonAdd = document.createElement("button");
buttonAdd.textContent = "Add Game";
document.querySelector('.container').appendChild(buttonAdd)

buttonAdd.onclick = function(){
    globalNum++;
    addNewGame(globalNum);
}

let buttonRemove = document.createElement("button");
buttonRemove.textContent = "Remove Game";
document.querySelector('.container').appendChild(buttonRemove)

buttonRemove.onclick = function(){
    removeGame(globalNum);
    globalNum--;
}

function removeGame(calc) {
   let s = document.querySelector('.container').querySelector(`#calc_0${calc}`).remove()
}

