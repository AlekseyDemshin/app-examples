function addElement(parentId, elementTag, elementId, elementClass, func, html) {
    let p = document.getElementById(parentId);
    let newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.setAttribute('class', elementClass);
    newElement.setAttribute('onClick', func);
    newElement.innerHTML = html;
    p.appendChild(newElement);
}

function deleteElement(elementId) {
    let element = document.getElementById(elementId);
    if (element) {
        element.parentNode.removeChild(element);
        return true;
    }
    return false;
}

function drawBuildButton() {
    if (document.getElementById("build")) {
        return;
    }
    deleteElement("export");
    deleteElement("stat-list__table");
    addElement(
        'buttons-block',
        'button',
        'build',
        'miro-btn miro-btn--primary miro-btn--medium',
        'onClick()',
        'BuildMatrix'
    );
}

async function onClick() {
    deleteElement('images-container');
    addElement(
        'root-element',
        'div',
        'stat-container',
        'stat-list',
        '',
        ''
    );
    await drawTemplate();
    deleteElement("build");
    drawExportButton()
}

function drawExportButton() {
    addElement(
        'buttons-block',
        'button',
        'export',
        'miro-btn miro-btn--primary miro-btn--medium',
        'exportToColumn()',
        'Make a list');
}