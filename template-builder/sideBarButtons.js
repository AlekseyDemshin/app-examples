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
    element.parentNode.removeChild(element);
}

function drawPaint() {
    deleteElement('build');
}

function drawBuildButton() {
    let onClick = 'drawTemplate(); deleteElement("build"); drawPaintButton(); drawExportButton()';
    addElement(
        'buttons-block',
        'button',
        'build',
        'miro-btn miro-btn--primary miro-btn--medium',
        onClick,
        'BuildMatrix'
    );
}

function drawPaintButton() {
    addElement(
        'buttons-block',
        'button',
        'paint',
        'miro-btn miro-btn--primary miro-btn--medium',
        'paint()',
        'Paint');
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