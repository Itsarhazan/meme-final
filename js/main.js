'use strict';

var gTxtBox;


function createBox(pos) {
    gTxtBox = {
        pos,
        size: 50,
        color: 'red',
        isDrag: false,
    }
}


function getTxtBox() {
    return gTxtBox;
}

function isBoxClicked(clickedPos) {
    const { pos } = gTxtBox
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    return distance <= gTxtBox.size
}

function setBoxDrag(isDrag) {
    gTxtBox.isDrag = isDrag;
}

function moveBox(dx, dy) {
    gTxtBox.pos.x += dx;
    gTxtBox.pos.y += dy;

}