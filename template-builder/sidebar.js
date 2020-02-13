miro.onReady(() => {
    // subscribe on user selected widgets
    miro.addListener(miro.enums.event.WIDGETS_CREATED, updateList)
    miro.addListener(miro.enums.event.WIDGETS_DELETED, updateList)
    //miro.addListener(miro.enums.event.WIDGETS_TRANSFORMATION_UPDATED, updateList)

    updateList()
})

const rowHeight = 100
const columnWidth = 150

// Get html elements for tip and text container
const tipElement = document.getElementById('tip')

// document.getElementById("build").addEventListener("click", () => drawTemplate())

function drawTemplate() {
    const widgets = []

    for (let i = 0; i < 5; i++) {
        const colX = i * columnWidth + (2 * i);
        widgets.push(getShape(colX, 100))
    }

    miro.board.widgets.create(widgets)
}

function getShape(x, y) {
    return {
        type: 'shape',
        x: x,
        y: y,
        width: columnWidth,
        height: rowHeight,
        style: {
            borderWidth: 0,
            backgroundColor: '#B2EEE4'
        }
    }
}

function updateList() {
    alert('updateList')
}

