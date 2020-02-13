miro.onReady(run)

const icon = '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"></circle>'


function run() {
  miro.initialize({
    extensionPoints: {
      bottomBar: {
        title: 'IE',
        svgIcon: icon,
        positionPriority: 1,
        onClick: () => {
          miro.board.ui.openLeftSidebar('sidebar.html')
        }
      }
    }
  })
}

