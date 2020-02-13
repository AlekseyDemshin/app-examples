async function createMatrix() {
    const topX = 0;
    const topY = 0;

    const zeroX = 0;
    const zeroY = 800;

    const rightX = 1200;
    const rightY = 800;

    let top = await miro.board.widgets.create(
        {
            "type": "shape",
            "x": topX,
            "y": topY,
            "height": 1,
            "width": 1,
            "style": {
                "backgroundOpacity": 0,
                "borderOpacity": 0
            }
        }
    );
    let zero = await miro.board.widgets.create(
        {
            "type": "shape",
            "x": zeroX,
            "y": zeroY,
            "height": 1,
            "width": 1,
            "style": {
                "backgroundOpacity": 0,
                "borderOpacity": 0
            }
        }
    );
    let right = await miro.board.widgets.create(
        {
            "type": "shape",
            "x": rightX,
            "y": rightY,
            "height": 1,
            "width": 1,
            "style": {
                "backgroundOpacity": 0,
                "borderOpacity": 0
            }
        }
    );
    let verLine = miro.board.widgets.create(
        {
            "type": "line",
            "startWidgetId": zero[0].id,
            "endWidgetId": top[0].id,
            "style": {
                "lineEndStyle": 1,
                "lineStartStyle": 0,
                "lineType": 0,
                "lineStyle": 0
            }
        }
    );
    let horLine = miro.board.widgets.create(
        {
            "type": "line",
            "startWidgetId": zero[0].id,
            "endWidgetId": right[0].id,
            "style": {
                "lineEndStyle": 1,
                "lineStartStyle": 0,
                "lineType": 0,
                "lineStyle": 0
            }
        }
    )
}