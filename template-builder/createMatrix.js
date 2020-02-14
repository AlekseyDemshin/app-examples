let appId;

async function createMatrix() {
    const topX = 0;
    const topY = 0;

    const zeroVertX = 0;
    const zeroVertY = 1005;

    const zeroHorX = -5;
    const zeroHorY = 1000;

    const rightX = 1000;
    const rightY = 1000;

    appId = await miro.getClientId();
    moveViewPort(-200, -100, rightX + 300, rightY + 300);
    drawAxis(topX, topY, zeroVertX, zeroVertY, zeroHorX, zeroHorY, rightX, rightY);
    drawScales(rightX, rightY);
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

async function drawAxis(topX, topY, zeroVertX, zeroVertY, zeroHorX, zeroHorY, rightX, rightY) {
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
                lineThickness: 4
            },
            metadata: {
                appId: {
                    axis: 'vertical'
                }
            }
        },{
            type: "line",
            startWidgetId: zeroH[0].id,
            endWidgetId: right[0].id,
            style: {
                lineEndStyle: 1,
                lineStartStyle: 0,
                lineType: 0,
                lineStyle: 0,
                lineThickness: 4
            },
            metadata: {
                appId: {
                    axis: 'horizontal'
                }
            }
        }]
    );
}

function drawScales(rightX, rightY) {
    miro.board.widgets.create([
        {
            type: 'TEXT',
            x: rightX - 50,
            y: rightY + 50,
            text: 'Effort',
            width: 50,
            scale: 2
        },
        {
            type: 'TEXT',
            x: -50,
            y: 50,
            text: 'Impact',
            width: 80,
            scale: 2,
            rotation: -90
        }]
    );
}