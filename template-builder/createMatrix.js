let appId;

async function createMatrix() {
    let topX = 0;
    let topY = 0;

    let zeroVertX;
    let zeroVertY;

    let zeroHorX;
    let zeroHorY;

    let rightX;
    let rightY;

    let size;

    let selection = await miro.board.selection.get();
    let viewport = await miro.board.viewport.getViewport();
    let zoom = await miro.board.viewport.getZoom();
    if (selection.length > 0) {
        let first = selection[0].bounds;
        zeroVertX = first.left;
        zeroHorY = first.bottom;
        size = Math.max(first.height, first.width);
        selection.forEach(w => {
            if (w.bounds.left < zeroVertX) {
                zeroVertX = w.bounds.left;
            }
            if (w.bounds.bottom > zeroHorY) {
                zeroHorY = w.bounds.bottom;
            }
            let s = Math.max(w.bounds.right - zeroVertX, zeroHorY - w.bounds.top);
            if (s > size) {
                size = s;
            }
        })
    } else {
        size = Math.max(viewport.height, viewport.width);
        zeroVertX = viewport.x;
        zeroHorY = viewport.y + viewport.height;
    }

    zeroVertX-=5;
    zeroHorY+=5;

    topX = zeroVertX;
    topY = zeroHorY - size;

    zeroVertY = topY + size + 5;
    zeroHorX = topX - 5;

    rightX = topX + size + 10;
    rightY = topY + size;

    appId = await miro.getClientId();
    moveViewPort(topX - 200, topY - 100, size + 300, size + 300);
    console.log(zoom)
    await drawAxis(topX, topY, zeroVertX, zeroVertY, zeroHorX, zeroHorY, rightX, rightY, zoom);
    await drawScales(topX, topY, rightX, rightY, zoom);
}

function moveViewPort(x, y, w, h) {
    miro.board.viewport.setViewportWithAnimation(
        {
            x: x,
            y: y,
            width: w,
            height: h,
        }
    )
}

async function drawAxis(topX, topY, zeroVertX, zeroVertY, zeroHorX, zeroHorY, rightX, rightY, zoom) {
    console.log(zoom)
    let top = await miro.board.widgets.create(
        {
            type: "shape",
            x: topX,
            y: topY,
            height: 0,
            width: 0,
            style: {
                backgroundOpacity: 0,
                borderOpacity: 0
            }
        }
    );
    let zeroV = await miro.board.widgets.create(
        {
            type: "shape",
            x: zeroVertX,
            y: zeroVertY,
            height: 0,
            width: 0,
            style: {
                backgroundOpacity: 0,
                borderOpacity: 0
            }
        }
    );
    let zeroH = await miro.board.widgets.create(
        {
            type: "shape",
            x: zeroHorX,
            y: zeroHorY,
            height: 0,
            width: 0,
            style: {
                backgroundOpacity: 0,
                borderOpacity: 0
            }
        }
    );
    let right = await miro.board.widgets.create(
        {
            type: "shape",
            x: rightX,
            y: rightY,
            height: 0,
            width: 0,
            style: {
                backgroundOpacity: 0,
                borderOpacity: 0
            }
        }
    );
    let thickness = 4; //Math.ceil(24 * (1.0 - zoom));
    miro.board.widgets.create([
        {
            type: "line",
            startWidgetId: zeroV[0].id,
            endWidgetId: top[0].id,
            style: {
                lineEndStyle: 1,
                lineStartStyle: 0,
                lineType: 0,
                lineStyle: 0,
                lineThickness: thickness
            },
            metadata: {
                [appId]: {
                    axis: 'vertical'
                }
            }
        }, {
            type: "line",
            startWidgetId: zeroH[0].id,
            endWidgetId: right[0].id,
            style: {
                lineEndStyle: 1,
                lineStartStyle: 0,
                lineType: 0,
                lineStyle: 0,
                lineThickness: thickness
            },
            metadata: {
                [appId]: {
                    axis: 'horizontal'
                }
            }
        }]
    );
}

function drawScales(topX, topY, rightX, rightY, zoom) {
    const scale = 2;// Math.floor(1 / zoom);
    miro.board.widgets.create([
        {
            type: 'TEXT',
            x: rightX - 50,
            y: rightY + 50,
            text: 'Effort',
            width: 50,
            scale: scale
        },
        {
            type: 'TEXT',
            x: topX - 50,
            y: topY + 50,
            text: 'Impact',
            width: 80,
            scale: scale,
            rotation: -90
        }]
    );
}