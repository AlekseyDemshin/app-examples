miro.onReady(() => {
    miro.addListener('WIDGETS_CREATED', updateList)
    miro.addListener('WIDGETS_DELETED', updateList)
    miro.addListener('WIDGETS_TRANSFORMATION_UPDATED', updateList)

    updateList()
})

function drawTemplate() {
    createMatrix()
}

let widgets = [];

async function updateList() {
    console.log("collect")
    widgets = await miro.board.widgets.get({
        type: 'sticker'
    });
    widgets = widgets
        .filter(w => w.x > 0 && w.x < 1200 && w.y > 0 && w.y < 800)
        .map(w => {
            w.ieRatio = (800 + 1 - w.y) / (w.x + 1 - 0);
            return w;
        })
        .sort((l, r) => r.ieRatio - l.ieRatio);

    //normalize
    if (widgets.length > 0) {
        const maxRatio = widgets[0].ieRatio;
        widgets.forEach(w => w.ieRatioNormalized = w.ieRatio / maxRatio);
    }

    console.log(widgets)
    createTable("Results", "Looks like the matrix is empty. Drag stickers into it", widgets)
}

function createTable(title, emptyText, data) {
    const container = document.getElementById("stat-container");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const statView = document.createElement("div")
    statView.className = "stat-list__table"

    const titleView = document.createElement("div");
    titleView.className = "stat-list__title";
    titleView.innerHTML = `<span>${title}</span>`;
    statView.appendChild(titleView);

    if (data.size === 0) {
        const emptyView = document.createElement('div')
        emptyView.className = "stat-list__empty"
        emptyView.innerText = emptyText
        statView.appendChild(emptyView);
    } else {
        data.forEach(w => {
            let itemView = document.createElement("div");
            itemView.className = "stat-list__item";
            itemView.innerHTML = `<span class="stat-list__item-name">${w.text} | </span>`
                + `<span class="stat-list__item-value">${w.ieRatioNormalized} | </span>`
                + `<span class="stat-list__item-value">${Math.ceil(w.ieRatioNormalized / 0.2) - 1}</span>`;
            itemView.onclick = function () {
                miro.board.selection.clear();
                miro.board.selection.selectWidgets(w.id);
                moveViewPort(-200, -100, 1300, 1300)
            };
            statView.appendChild(itemView)
        })
    }
    container.appendChild(statView);
}


const colors = ['#F5F6F8', '#FFF9B2', '#F5D22B', '#FFA75B', '#F38090'];

function paint() {
    const step = 1 / colors.length;
    widgets.forEach(w => w.style.stickerBackgroundColor = colors[Math.ceil(w.ieRatioNormalized / step) - 1])
    miro.board.widgets.update(widgets);
}

