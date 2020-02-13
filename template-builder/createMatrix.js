function createMatrix() {
    miro.board.widgets.create({
        "type": "shape",
        "x": 1368, // default: "0"
        "y": 461, // default: "0",
        // number of degrees clockwise
        "rotation": 0.0,
        "width": 328, // default: "100"
        "height": 131, // default: "100"
        "style": {
            // supports short hex code color format
            "backgroundColor": "#ffae2b", // default: "#ffffff"
            // allowed values: 0.0, 0.25, 0.5, 0.75, 1.0
            "backgroundOpacity": 1.0, // default: 1.0
            "borderColor": "#1a1a1a", // default: "#1a1a1a"
            // allowed values: 0.0, 0.25, 0.5, 0.75, 1.0
            "borderOpacity": 1.0, // default: 1.0
            // allowed values: "normal", "dashed", "dotted"
            "borderStyle": "normal", // default: normal
            // allowed values: 2.0, 4.0, 8.0, 16.0, 24.0
            "borderWidth": 4.0, // default: 2.0
            // allowed values:
            //  "Arial", "Abril Fatface", "Bangers", "EB Garamond", "Georgia", "Graduate",
            //  "Gravitas One", "Fredoka One", "Nixie One", "OpenSans", "Permanent Marker",
            //  "PT Sans", "PT Sans Narrow", "PT Serif", "Rammetto One", "Roboto",
            //  "Roboto Condensed", "Roboto Slab", "Caveat", "Times New Roman", "Titan One",
            //  "Lemon Tuesday", "Roboto Mono", "Noto Sans", "IBM Plex Sans", "IBM Plex Serif",
            //  "IBM Plex Mono"
            "fontFamily": "Bangers", // default: "OpenSans"
            // allowed values between 10 to 999 inclusive
            "fontSize": 48, // default: 14
            // allowed values:
            //  "rectangle", "circle", "triangle", "rounded_rectangle", "rhombus",
            //  "callout", "parallelogram", "star", "arrow", "arrow_left", "pentagon",
            //  "hexagon", "octagon", "trapeze", "predefined_process",
            //  "arrow_left_right", "cloud", "brace_left", "brace_right", "cross", "barrel"
            "shapeType": "callout", // default: "rectangle"
            // allowed values: "center", "right", "left"
            "textAlign": "center", // default: center
            // allowed values: "middle", "bottom", "top"
            "textAlignVertical": "middle", // default: "middle"
            "textColor": "#1a1a1a" // default: "#1a1a1a"
        },
        "text": "<p>Shape</p>"
    })
}