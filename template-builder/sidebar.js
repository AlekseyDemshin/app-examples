miro.onReady(() => {
    miro.addListener('WIDGETS_CREATED', updateList)
    miro.addListener('WIDGETS_DELETED', updateList)
    miro.addListener('WIDGETS_TRANSFORMATION_UPDATED', updateList)

    updateList()
})

function drawTemplate() {
    createMatrix()
}

async function updateList() {
    console.log("collect")
    let widgets = await miro.board.widgets.get({
        type: 'sticker'
    });
    widgets = widgets
        .filter(w => w.x > 0 && w.x < 1200 && w.y > 0 && w.y < 800)
        .sort((l,r) => (800 - l.y) / (l.x - 0) - (800 - r.y) / (r.x - 0))

    console.log(widgets)
    createTable("Results", "Looks like the matrix is empty. Drag stickers into it", widgets)
}

function createTable(title, emptyText, data) {
    const container = document.getElementById("stat-container");
    while (container.firstChild)  {
        container.removeChild(container.firstChild);
    }

    const statView = document.createElement("div")
    statView.className = "stat-list__table"

    const titleView = document.createElement("div");
    titleView.className = "stat-list__title";
    titleView.innerHTML = `<span>${title}</span>`;
    statView.appendChild(titleView);

    if (data.size === 0){
        const emptyView = document.createElement('div')
        emptyView.className = "stat-list__empty"
        emptyView.innerText = emptyText
        statView.appendChild(emptyView);
    } else {
        data.forEach(w => {
            let itemView = document.createElement("div");
            itemView.className = "stat-list__item";
            itemView.innerHTML = `<span class="stat-list__item-name">${w.text} |</span>`
                 + `<span class="stat-list__item-value">${(800 - w.y) / (w.x - 0)}</span>`;
            statView.appendChild(itemView)
        })
    }
    container.appendChild(statView);
}

