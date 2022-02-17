export default function MainView(btns) {
    let content = document.createElement('div');
    content.classList = "card text-center w-50";
    content.style.margin = "auto";
    let spanDiv = document.createElement('div');
    spanDiv.classList = "card-header bg-dark w-100 h-100";
    content.append(spanDiv)
    let span = document.createElement('span');
    span.classList = "d-block p-2 bg-dark text-white";
    span.style.height = "24px";
    spanDiv.append(span)

    let body = document.createElement('div');
    body.classList = "card-body";
    content.append(body)

    let btnGroup = document.createElement('div');
    btnGroup.classList = "btn-group w-100 justify-content-center";
    btnGroup.id = "quickmath";

    btnGroup.innerHTML = btns;
    body.append(btnGroup);

    let footer = document.createElement('div');
    footer.classList = "card-footer";

    let plus = document.createElement('button');
    plus.classList = "btn btn-success";
    plus.id = "plusik";
    plus.innerText = "+";

    let minus = document.createElement('button');
    minus.classList = "btn btn-success";
    minus.id = "minusik";
    minus.innerText = "-";


    let equals = document.createElement('button');
    equals.classList = "btn btn-success";
    equals.id = "equals";
    equals.innerText = "=";

    let multiply = document.createElement('button');
    multiply.classList = "btn btn-success";
    multiply.id = "multiply";
    multiply.innerText = "*";

    let divide = document.createElement('button');
    divide.classList = "btn btn-success";
    divide.id = "divide";
    divide.innerText = "/";

    let todefault = document.createElement('button');
    todefault.classList = "btn btn-warning";
    todefault.style.marginLeft = "5px";
    todefault.id = "todefault";
    todefault.innerText = "AC";

    let dot = document.createElement('button');
    dot.classList = "btn btn-secondary";
    dot.style.marginRight = "5px";
    dot.id = "dot";
    dot.innerText = ".";

    let toplusorminus = document.createElement('button');
    toplusorminus.classList = "btn btn-secondary";
    toplusorminus.style.marginRight = "10px";
    toplusorminus.id = "toplusorminus";
    toplusorminus.innerText = "+/-";

    footer.append(dot)
    footer.append(toplusorminus)
    footer.append(plus)
    footer.append(divide)
    footer.append(minus)
    footer.append(multiply)
    footer.append(equals)
    footer.append(todefault)

    content.append(footer)

    return content;
}