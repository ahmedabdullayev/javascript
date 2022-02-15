export default function NumberButtonsView() {
    let numberButtons = "";
    let iter = 0;
    for (let i = 0; i < 3; i++) {
        numberButtons = numberButtons + '<div class="btn-group-vertical w-100">';
        for (let j = 0; j < 3; j++) {
            numberButtons = numberButtons +
                `<button class="btn btn-primary num" value="${iter}" number="${iter}">${iter}</button>`
            iter++;
            if (iter == 8) {
                numberButtons = numberButtons +
                    `<button class="btn btn-primary num" value="${iter}" number="${iter}">${iter}</button>`
                iter++;
            }
        }
        numberButtons = numberButtons + '</div>';
    }

    return numberButtons;

}