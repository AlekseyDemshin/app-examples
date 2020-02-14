miro.onReady(() => {
    miro.addListener('WIDGETS_CREATED', onCreateOrUpdate);
    miro.addListener('WIDGETS_TRANSFORMATION_UPDATED', onCreateOrUpdate);
    miro.addListener('WIDGETS_DELETED', onDelete);

    refreshAll();

    // hack to control changes of content (text) and changes from other clients
    setInterval(refreshAll, 1000);
});

function drawTemplate() {
    createMatrix()
}

async function onCreateOrUpdate() {
    await refreshAll();
}

function onDelete(e) {
    removeFromTable(e.data);
}

async function findMatrix() {
    const appId = await miro.clientId();
    let axises = (await miro.board.widgets.get({type: 'line'}))
        .filter(w => w.metadata[appId] != null && w.metadata[appId].axis != null);
    if (axises.length !== 2) {
        return null;
    }
    let result = {};
    axises.forEach(w => {
        if (w.metadata[appId].axis === 'horizontal') {

        }
    })
}

async function getAllWidgetsInMatrix() {
    let widgets = await miro.board.widgets.get({type: 'sticker'});
    widgets = widgets.filter(w => w.x > 0 && w.x < 1000 && w.y > 0 && w.y < 1000);
    return widgets;
}

async function refreshAll() {
    let widgets = await getAllWidgetsInMatrix();
    calcIERatio(widgets);
    widgets.sort((l, r) => r.ieRatioNormalized - l.ieRatioNormalized);
    createTable(widgets);
}

function calcIERatio(widgets) {
    widgets
        .forEach(w => {
            let distance = ((1000 - w.y) - w.x) / 2; // distance from the widget to the line where impact = effort
            distance = Math.sqrt(2) * 500 + distance; // distance from the point (x;x) to the right bottom corner
            distance /= Math.sqrt(2) * 1000; // normalize
            w.ieRatioNormalized = distance;
        });
}

function createTable(widgets) {
    const container = document.getElementById("stat-container");
    // clear old
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const statView = document.createElement("div");
    statView.id = "stat-list__table";
    statView.className = "stat-list__table";

    const titleView = document.createElement("div");
    titleView.className = "stat-list__title";
    titleView.innerHTML = `<span>Results</span>`;
    statView.appendChild(titleView);

    if (widgets.length === 0) {
        const emptyView = document.createElement('div');
        emptyView.className = "stat-list__empty";
        emptyView.innerText = "Looks like the matrix is empty. Drag stickers into it";
        statView.appendChild(emptyView);
    } else {
        widgets.forEach((w, index) => {
            let itemView = document.createElement("div");
            itemView.id = "stat-list__item_" + w.id;
            itemView.className = "stat-list__item";
            itemView.innerHTML =
                `<span class="stat-list__item-num">${index + 1} | </span>`
                + `<span class="stat-list__item-name">${w.text} | </span>`
                + `<span class="stat-list__item-value">${w.ieRatioNormalized}</span>`;
            itemView.onclick = async function () {
                moveViewPort(-200, -100, 1300, 1300);
                await miro.board.selection.clear();
                await miro.board.selection.selectWidgets(w.id);
            };
            statView.appendChild(itemView)
        })
    }
    container.appendChild(statView);
}

function removeFromTable(widgets) {
    let changed = false;
    widgets.forEach(w => {
            let item = document.getElementById("stat-list__item_" + w.id);
            if (item != null) {
                item.remove();
                changed = true;
            }
        }
    );

    // add tip if there is no widgets in the list
    const statView = document.getElementById("stat-list__table");
    if (statView.getElementsByClassName("stat-list__item").length === 0) {
        const emptyView = document.createElement('div');
        emptyView.className = "stat-list__empty";
        emptyView.innerText = "Looks like the matrix is empty. Drag stickers into it";
        statView.appendChild(emptyView);
    } else {
        if (changed) {
            let num = 1;
            let items = statView.getElementsByClassName("stat-list__item");
            Array.from(items).forEach(item => {
                let numElem = item.getElementsByClassName("stat-list__item-num");
                numElem.item(0).value = num;
            });
        }
    }
}


const colors = ['#f5f6f8', '#fff9b2', '#f5d22b', '#ffa75b', '#f38090'];
const ranges = [0.3, 0.42, 0.57, 0.7, 1];

async function paint() {
    let widgetsToUpdate = [];
    let widgets = await getAllWidgetsInMatrix();
    calcIERatio(widgets);
    // update only widgets with a changed color
    widgets.forEach(w => {
        let index = 4;
        for (let i = 0; i < ranges.length; i++) {
            if (ranges[i] > w.ieRatioNormalized) {
                index = i;
                break;
            }
        }
        if (w.style.stickerBackgroundColor.toLowerCase() !== colors[index]) {
            w.style.stickerBackgroundColor = colors[index];
            widgetsToUpdate.push(w);
        }
    });

    await miro.board.widgets.update(widgetsToUpdate);
}

async function exportToColumn() {
    let widgets = await getAllWidgetsInMatrix();
    if (widgets.length > 0) {
        calcIERatio(widgets);
        widgets.sort((l, r) => r.ieRatioNormalized - l.ieRatioNormalized);

        let x = 1400 - widgets[0].bounds.height/2;
        let y = 0;
        let margin = 5;

        widgets.forEach(w => {
            w.id = null;
            w.x = x;
            w.y = y;
            y += w.bounds.height + margin;
        });

        await miro.board.widgets.create(widgets);
    }
}

