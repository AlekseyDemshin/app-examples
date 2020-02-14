miro.onReady(run)

// yes, we need this crazy svg :-)
const icon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\">\n" +
    "    <rect id=\"backgroundrect\" width=\"100%\" height=\"100%\" x=\"0\" y=\"0\" fill=\"#FFFFFF\" stroke=\"none\" class=\"\" style=\"\"/>\n" +
    "    <g class=\"currentLayer\" style=\"\">\n" +
    "        <title>Layer 1</title>\n" +
    "        <g class=\"\">\n" +
    "            <path fill=\"#4a90d6\" fill-opacity=\"1\" stroke=\"#222222\" stroke-opacity=\"1\" stroke-width=\"1\"\n" +
    "                  stroke-dasharray=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"butt\" stroke-dashoffset=\"\"\n" +
    "                  fill-rule=\"nonzero\" opacity=\"1\" marker-start=\"\" marker-mid=\"\" marker-end=\"\"\n" +
    "                  d=\"M0.5904537593667154,2.2031901559304594 L0.5904537593667154,23.228375427055546 \" id=\"svg_1\"\n" +
    "                  class=\"\"/>\n" +
    "            <path fill=\"#4a90d6\" fill-opacity=\"1\" stroke=\"#222222\" stroke-opacity=\"1\" stroke-width=\"1\"\n" +
    "                  stroke-dasharray=\"none\" stroke-linejoin=\"round\" stroke-linecap=\"butt\" stroke-dashoffset=\"\"\n" +
    "                  fill-rule=\"nonzero\" opacity=\"1\" marker-start=\"\" marker-mid=\"\" marker-end=\"\"\n" +
    "                  d=\"M0.5904537593667154,23.228375427055546 L21.67634231949312,23.402137288800375 \" id=\"svg_6\"\n" +
    "                  class=\"\"/>\n" +
    "            <rect fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1\" stroke-linejoin=\"round\" stroke-dashoffset=\"\"\n" +
    "                  fill-rule=\"nonzero\" id=\"svg_8\" x=\"2.8213744663789537\" y=\"4.197974592097057\" width=\"2.615695636401684\"\n" +
    "                  height=\"2.4708935546987574\" style=\"color: rgb(0, 0, 0);\" class=\"\"/>\n" +
    "            <rect fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1\" stroke-linejoin=\"round\" stroke-dashoffset=\"\"\n" +
    "                  fill-rule=\"nonzero\" x=\"16.030550883431868\" y=\"18.23793332414429\" width=\"2.615695636401684\"\n" +
    "                  height=\"2.4708935546987574\" style=\"color: rgb(0, 0, 0);\" class=\"\" id=\"svg_15\"/>\n" +
    "            <rect fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1\" stroke-linejoin=\"round\" stroke-dashoffset=\"\"\n" +
    "                  fill-rule=\"nonzero\" x=\"6.794583061239896\" y=\"14.24140991483274\" width=\"2.615695636401684\"\n" +
    "                  height=\"2.4708935546987574\" style=\"color: rgb(0, 0, 0);\" class=\"\" id=\"svg_14\"/>\n" +
    "            <rect fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1\" stroke-linejoin=\"round\" stroke-dashoffset=\"\"\n" +
    "                  fill-rule=\"nonzero\" x=\"2.7865215336787603\" y=\"18.585456142635497\" width=\"2.615695636401684\"\n" +
    "                  height=\"2.4708935546987574\" style=\"color: rgb(0, 0, 0);\" class=\"\" id=\"svg_13\"/>\n" +
    "            <rect fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1\" stroke-linejoin=\"round\" stroke-dashoffset=\"\"\n" +
    "                  fill-rule=\"nonzero\" x=\"10.279853749272961\" y=\"6.943411875095677\" width=\"2.615695636401684\"\n" +
    "                  height=\"2.4708935546987574\" style=\"color: rgb(0, 0, 0);\" class=\"\" id=\"svg_12\"/>\n" +
    "            <rect fill=\"#ffffff\" stroke=\"#000000\" stroke-width=\"1\" stroke-linejoin=\"round\" stroke-dashoffset=\"\"\n" +
    "                  fill-rule=\"nonzero\" x=\"4.703420556516626\" y=\"8.854792351478045\" width=\"2.615695636401684\"\n" +
    "                  height=\"2.4708935546987574\" style=\"color: rgb(0, 0, 0);\" class=\"\" id=\"svg_11\"/>\n" +
    "            <path fill=\"#000000\" stroke=\"#222222\" stroke-width=\"1\" stroke-linejoin=\"round\" stroke-dashoffset=\"\"\n" +
    "                  fill-rule=\"nonzero\" marker-start=\"\" marker-mid=\"\" marker-end=\"\" id=\"svg_18\"\n" +
    "                  d=\"M-0.3361344635486604,2.1852783198921233 L0.6223149440432721,0.512820526957513 L1.5807643516350636,2.1852783198921233 L-0.3361344635486604,2.1852783198921233 z\"\n" +
    "                  style=\"color: rgb(0, 0, 0);\" class=\"\"/>\n" +
    "            <path fill=\"#000000\" stroke=\"#222222\" stroke-width=\"1\" stroke-linejoin=\"round\" stroke-dashoffset=\"\"\n" +
    "                  fill-rule=\"nonzero\" marker-start=\"\" marker-mid=\"\" marker-end=\"\"\n" +
    "                  d=\"M21.66243721039732,22.29244842319034 L23.382404034779874,23.169478264873064 L21.751413636809815,23.9017685893337 L21.66243721039732,22.29244842319034 z\"\n" +
    "                  style=\"color: rgb(0, 0, 0);\" class=\"\" id=\"svg_22\"/>\n" +
    "        </g>\n" +
    "    </g>\n" +
    "</svg>";

function run() {
    miro.initialize({
        extensionPoints: {
            bottomBar: {
                title: 'Priority matrix app',
                svgIcon: icon,
                positionPriority: 1,
                onClick: () => {
                    miro.board.ui.openLeftSidebar('sidebar.html');
                }
            }
        }
    })
}

