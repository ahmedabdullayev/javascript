export default function MainView(btns : string, order : string) {
    let content = document.createElement('div');
    content.className = "card text-center w-50";
    content.id = "calc"+order;
    content.style.margin = "auto";
    let spanDiv = document.createElement('div');
    spanDiv.className = "card-header bg-dark w-100 h-100";
    content.append(spanDiv)
    let span = document.createElement('span');
    span.className = "d-block p-2 bg-dark text-white";
    span.id="monitor"+order;
    span.style.height = "24px";
    spanDiv.append(span)

    let body = document.createElement('div');
    body.className = "card-body";
    content.append(body)

    let btnGroup = document.createElement('div');
    btnGroup.className = "btn-group w-100 justify-content-center quickmath"+order;

    btnGroup.innerHTML = btns;
    body.append(btnGroup);

    let footer = document.createElement('div');
    footer.className = "card-footer";

    let plus = document.createElement('button');
    plus.className = "btn btn-success plusik"+order;
    plus.innerText = "+";

    let minus = document.createElement('button');
    minus.className = "btn btn-success minusik"+order;
    minus.innerText = "-";


    let equals = document.createElement('button');
    equals.className = "btn btn-success equals"+order;
    equals.innerText = "=";

    let multiply = document.createElement('button');
    multiply.className = "btn btn-success multiply"+order;
    multiply.innerText = "*";

    let divide = document.createElement('button');
    divide.className = "btn btn-success divide"+order;;
    divide.innerText = "/";

    let todefault = document.createElement('button');
    todefault.className = "btn btn-warning todefault"+order;;
    todefault.style.marginLeft = "5px";
    todefault.innerText = "AC";

    let dot = document.createElement('button');
    dot.className = "btn btn-secondary dot"+order;
    dot.style.marginRight = "5px";
    dot.innerText = ".";

    let toplusorminus = document.createElement('button');
    toplusorminus.className = "btn btn-secondary toplusorminus"+order;;
    toplusorminus.style.marginRight = "10px";
    toplusorminus.innerText = "+/-";

    let clearnum = document.createElement('button');
    clearnum.className = "btn btn-warning clearnum"+order;;
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