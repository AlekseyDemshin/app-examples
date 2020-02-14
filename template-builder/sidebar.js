miro.onReady(init);

async function init() {
    miro.addListener('WIDGETS_CREATED', onCreateOrUpdate);
    miro.addListener('WIDGETS_TRANSFORMATION_UPDATED', onCreateOrUpdate);
    miro.addListener('WIDGETS_DELETED', onDelete);

    let matrix = await findMatrix();
    if (matrix == null) {
        drawBuildButton();
    } else {
        drawExportButton();
    }

    await refreshAll();

    // hack to control changes of content (text) and changes from other clients
    setInterval(refreshAll, 1000);
}


async function drawTemplate() {
    animateMatrix();
    // delete old matrix
    await createMatrix()
}

async function onCreateOrUpdate() {
    await refreshAll();
}

function onDelete(e) {
    removeFromTable(e.data);
}

async function findMatrix() {
    const appId = await miro.getClientId();
    let axises = (await miro.board.widgets.get({type: 'line'}))
        .filter(w => w.metadata[appId] != null && w.metadata[appId].axis != null);
    if (axises.length !== 2) {
        return null;
    }
    let result = {};
    axises.forEach(w => {
        if (w.metadata[appId].axis === 'vertical') {
            result.leftTop = {};
            result.leftTop.x = w.bounds.left;
            result.leftTop.y = w.bounds.top;
        }
        if (w.metadata[appId].axis === 'horizontal') {
            result.rightBottom = {};
            result.rightBottom.x = w.bounds.right;
            result.rightBottom.y = w.bounds.bottom;
        }
    });
    result.size = result.rightBottom.x - result.leftTop.x;
    return result;
}

async function getAllWidgetsInMatrix(matrix) {
    let widgets = await miro.board.widgets.get({type: 'sticker'});
    widgets = widgets.filter(w => w.x > matrix.leftTop.x && w.x < matrix.rightBottom.x
        && w.y > matrix.leftTop.y && w.y < matrix.rightBottom.y);
    return widgets;
}

async function refreshAll() {
    let matrix = await findMatrix();
    if (matrix == null) {
        drawBuildButton();
        deleteElement("stat-list__table");
        return;
    }
    let widgets = await getAllWidgetsInMatrix(matrix);
    calcIERatio(matrix, widgets);
    widgets.sort((l, r) => r.ieRatioNormalized - l.ieRatioNormalized);
    createTable(matrix, widgets);
    await paint(widgets);
}

function calcIERatio(matrix, widgets) {
    widgets
        .forEach(w => {
            let distance = ((matrix.rightBottom.y - w.y) - (w.x - matrix.leftTop.x)) / 2; // distance from the widget to the line where impact = effort
            distance = Math.sqrt(2) * matrix.size / 2 + distance; // distance from the point (x;x) to the right bottom corner
            distance /= Math.sqrt(2) * matrix.size; // normalize
            w.ieRatioNormalized = distance;
        });
}

function createTable(matrix, widgets) {
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
    titleView.innerHTML = `<span>Tasks:</span>`;
    statView.appendChild(titleView);

    let itemViewIds = [];
    if (widgets.length === 0) {
        const emptyView = document.createElement('div');
        emptyView.className = "stat-list__empty";
        emptyView.innerText = "Fill the matrix with stickers to get a prioritised list of items";
        statView.appendChild(emptyView);
    } else {
        widgets.forEach((w, index) => {
            let itemView = document.createElement("div");
            itemView.id = "stat-list__item_" + w.id;
            itemView.className = "stat-list__item";
            itemView.innerHTML =
                `<span class="stat-list__item-num"><b>${index + 1}.</b> </span>`
                + `<span class="stat-list__item-name">${w.text}</span>`;
            itemView.onclick = async function () {
                moveViewPort(matrix.leftTop.x - 200, matrix.leftTop.y - 100,matrix.size + 300, matrix.size + 300);
                await miro.board.selection.clear();
                await miro.board.selection.selectWidgets(w.id);
            };
            statView.appendChild(itemView);
            itemViewIds.push(itemView.id)
        })
    }
    container.appendChild(statView);
    itemViewIds.forEach((itemID, index) => {
        addElement(
            itemID,
            'div',
            itemID + '_border',
            'sidebar-list-item__border',
            '',
            '');
    })
}

function animateMatrix() {
    var c = document.getElementById("c");
    c.hidden = false;
    var ctx = c.getContext("2d");

    //making the canvas full screen
    c.height = window.innerHeight;
    c.width = window.innerWidth;

    var chars = "jg9gj583hegi845gniewrgli;g04jsu84k$%*";
    //converting the string into an array of single characters
    chars = chars.split("");

    var font_size = 10;
    var columns = c.width/font_size; //number of columns for the rain
    //an array of drops - one per column
    var drops = [];
    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)
    for(var x = 0; x < columns; x++)
        drops[x] = 1;

    //drawing the characters
    function draw()
    {
        //Black BG for the canvas
        //translucent BG to show trail
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, c.width, c.height);

        ctx.fillStyle = "#0F0"; //green text
        ctx.font = font_size + "px arial";
        //looping over drops
        for(var i = 0; i < drops.length; i++)
        {
            //a random chars character to print
            var text = chars[Math.floor(Math.random()*chars.length)];
            //x = i*font_size, y = value of drops[i]*font_size
            ctx.fillText(text, i*font_size, drops[i]*font_size);

            //sending the drop back to the top randomly after it has crossed the screen
            //adding a randomness to the reset to make the drops scattered on the Y axis
            if(drops[i]*font_size > c.height && Math.random() > 0.975)
                drops[i] = 0;

            //incrementing Y coordinate
            drops[i]++;
        }
    }
    let interval = setInterval(draw, 33);
    setTimeout(() => {
        clearInterval(interval);
        c.hidden = true;
    }, 2500)
}

async function removeFromTable(widgets) {
    let changed = false;
    widgets.forEach(w => {
            let item = document.getElementById("stat-list__item_" + w.id);
            if (item != null) {
                item.remove();
                changed = true;
            }
        }
    );

    let matrix = await findMatrix();
    if (matrix == null) {
        deleteElement("stat-list__table");
        return;
    }

    // add tip if there is no widgets in the list or recalculate numbers
    if (changed) {
        const statView = document.getElementById("stat-list__table");
        if (statView.getElementsByClassName("stat-list__item").length === 0) {
            const emptyView = document.createElement('div');
            emptyView.className = "stat-list__empty";
            emptyView.innerText = "Fill the matrix with stickers to get a prioritised list of items";
            statView.appendChild(emptyView);
        } else {
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

async function paint(widgets) {
    let widgetsToUpdate = [];
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
    if (widgetsToUpdate.length > 0) {
        await miro.board.widgets.update(widgetsToUpdate);
    }
}

async function exportToColumn() {
    let matrix = await findMatrix();
    let widgets = await getAllWidgetsInMatrix(matrix);
    if (widgets.length > 0) {
        calcIERatio(matrix, widgets);
        widgets.sort((l, r) => r.ieRatioNormalized - l.ieRatioNormalized);

        let x = matrix.rightBottom.x + matrix.size * 0.4;
        let y = matrix.leftTop.y + widgets[0].bounds.height / 2;
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

