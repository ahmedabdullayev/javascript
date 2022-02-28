export default function MainView(btns, order) {
    let content = document.createElement('div');
    content.classList = "card text-center w-50";
    content.id = "calc"+order;
    content.style.margin = "auto";
    let spanDiv = document.createElement('div');
    spanDiv.classList = "card-header bg-dark w-100 h-100";
    content.append(spanDiv)
    let span = document.createElement('span');
    span.classList = "d-block p-2 bg-dark text-white";
    span.id="monitor"+order;
    span.style.height = "24px";
    spanDiv.append(span)

    let body = document.createElement('div');
    body.classList = "card-body";
    content.append(body)

    let btnGroup = document.createElement('div');
    btnGroup.classList = "btn-group w-100 justify-content-center quickmath"+order;

    btnGroup.innerHTML = btns;
    body.append(btnGroup);

    let footer = document.createElement('div');
    footer.classList = "card-footer";

    let plus = document.createElement('button');
    plus.classList = "btn btn-success plusik"+order;
    plus.innerText = "+";

    let minus = document.createElement('button');
    minus.classList = "btn btn-success minusik"+order;
    minus.innerText = "-";


    let equals = document.createElement('button');
    equals.classList = "btn btn-success equals"+order;
    equals.innerText = "=";

    let multiply = document.createElement('button');
    multiply.classList = "btn btn-success multiply"+order;
    multiply.innerText = "*";

    let divide = document.createElement('button');
    divide.classList = "btn btn-success divide"+order;;
    divide.innerText = "/";

    let todefault = document.createElement('button');
    todefault.classList = "btn btn-warning todefault"+order;;
    todefault.style.marginLeft = "5px";
    todefault.innerText = "AC";

    let dot = document.createElement('button');
    dot.classList = "btn btn-secondary dot"+order;
    dot.style.marginRight = "5px";
    dot.innerText = ".";

    let toplusorminus = document.createElement('button');
    toplusorminus.classList = "btn btn-secondary toplusorminus"+order;;
    toplusorminus.style.marginRight = "10px";
    toplusorminus.innerText = "+/-";

    let clearnum = document.createElement('button');
    clearnum.classList = "btn btn-warning clearnum"+order;;
    clearnum.style.marginLeft = "5px"
    clearnum.innerText = "C";

    footer.append(dot)
    footer.append(toplusorminus)
    footer.append(plus)
    footer.append(divide)
    footer.append(minus)
    footer.append(multiply)
    footer.append(equals)
    footer.append(todefault)
    footer.append(clearnum)

    content.append(footer)

    return content;
}