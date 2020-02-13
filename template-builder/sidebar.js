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

function drawTemplate() {
    createMatrix()
}

function updateList() {
    alert('updateList')
}

