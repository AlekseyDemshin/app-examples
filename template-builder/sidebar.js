miro.onReady(() => {
  // subscribe on user selected widgets
  miro.addListener(miro.enums.event.WIDGETS_CREATED, updateList)
  miro.addListener(miro.enums.event.WIDGETS_DELETED, updateList)
  miro.addListener(miro.enums.event.WIDGETS_TRANSFORMATION_UPDATED, updateList)

  updateList()
})

// Get html elements for tip and text container
const tipElement = document.getElementById('tip')
const widgetTextElement = document.getElementById('widget-text')

document.getElementById("build").addEventListener("click", () => drawTemplate())

function drawTemplate() {
    alert('drawTemplate')
}

function updateList() {
  alert('updateList')
}

