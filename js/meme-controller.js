'use strict';

var gCanvas;
var gCtx;
var gInputTxt;
var gPageEditor = document.querySelector('.meme-editor')
var gElImgs = document.querySelector('.meme-gallery')
var gTxt;
var gStartPos;

function init() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    renderGallery();
    addMouseListeners();
    // addListeners()
}

function renderMeme(id) {
    gMeme.selectedImgId = id;
    renderCanvas()
}

function renderCanvas(id) {
    id = gMeme.selectedImgId;
    var img = document.querySelector(`.img-${id}`)
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    var elTxt = document.querySelector('.txt-img')
    if (elTxt.value)
        elTxt.value = gMeme.lines[gMeme.selectedLineIdx].txt;
    gMeme.lines.forEach(line => {
        drawText(line);
    })
}

function btnImg(id) {
    renderMeme(id);
    gMeme.selectedImgId = id;
    document.querySelector('.main-gallery').classList.add('hide');
    document.querySelector('.meme-editor').classList.remove('hide');
}

function onAddTxt(txt) {
    setLineTxt(txt);
    addTxtBox();
    renderCanvas();
}

function drawText(line) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = line.strokeColor;
    gCtx.fillStyle = line.fillColor;
    gCtx.font = `${line.size}px ${line.font}`;;
    gCtx.fillText(line.txt, line.location.x, line.location.y);
    gCtx.strokeText(line.txt, line.location.x, line.location.y);
}

function onAddLine() {

    if (gMeme.selectedLineIdx === 0 || gMeme.selectedLineIdx === 1)
        gMeme.selectedLineIdx++
        else gMeme.selectedLineIdx = 0;

}

function onClearLine() {
    clearLine()
    renderCanvas()
}

function onSwitchLine() {

    if (gMeme.selectedLineIdx === 0) {
        gMeme.lines[2].txt = gMeme.lines[gMeme.selectedLineIdx].txt;
        gMeme.lines[0].txt = '';

    }
    if (gMeme.selectedLineIdx === 2) {
        gMeme.lines[0].txt = gMeme.lines[gMeme.selectedLineIdx].txt;
        gMeme.lines[2].txt = '';
        gMeme.selectedLineIdx = 0;
    }
    renderCanvas();
}

function onChangeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color;
    renderCanvas()
}

function onChangeFillColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color;
    renderCanvas()
}

function increaseSize() {
    gMeme.lines[gMeme.selectedLineIdx].size++
        renderCanvas()
}

function decreaseSize() {
    gMeme.lines[gMeme.selectedLineIdx].size--
        renderCanvas()
}

function alignToLeft() {
    gMeme.lines[gMeme.selectedLineIdx].location.x = 0;
    renderCanvas()
}

function alignToCenter() {
    gMeme.lines[gMeme.selectedLineIdx].location.x = 150;
    renderCanvas()
}

function alignToRight() {
    gMeme.lines[gMeme.selectedLineIdx].location.x = 300;
    renderCanvas()
}


function wordsSearch(word) {

    if (word === 'cat') {
        var elCat = document.querySelector('.cat')
        elCat.style.fontSize = '40' + 'px';
        elCat.style.color = 'blue';
    }
    if (word === 'funny') {
        var elFunny = document.querySelector('.funny')
        elFunny.style.fontSize = '40' + 'px';
        elFunny.style.color = 'blue';
    }
    if (word === 'priorities') {
        var elPriorities = document.querySelector('.priorities')
        elPriorities.style.fontSize = '40' + 'px';
        elPriorities.style.color = 'blue';
    }
    if (word === 'ironic') {
        var elIronic = document.querySelector('.ironic')
        elIronic.style.fontSize = '40' + 'px';
        elIronic.style.color = 'blue';
    }
}

// function addListeners() {
//     addMouseListeners()
//         // resizeCanvas()
//     renderCanvas()
//         // addTouchListeners()
//         // window.addEventListener('resize', () => {
//         //     resizeCanvas()
//         // })
// }


function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function getTxt() {
    gTxt = gMeme.lines[gMeme.selectedLineIdx].location;
    return gTxt;
}

function setTxtDrag(isDrag) {
    gTxt.isDrag = isDrag
}

function moveTxt(dx, dy) {
    gTxt.pos.x += dx
    gTxt.pos.y += dy

}

function isTxtClicked(clickedPos) {
    var lineIdx;
    gTxtBox.forEach((txtBox, idx) => {
        if (txtBox.x <= clickedPos.x && clickedPos.x - txtBox.x <= txtBox.width) {
            if (txtBox.y <= clickedPos.y && clickedPos.y - txtBox.y <= txtBox.height)
                lineIdx = idx;
        }
    });
    return lineIdx;
}

function onDown(ev) {
    const pos = getEvPos(ev);
    console.log('onDown()');

    if (!isTxtClicked(pos) || isTxtClicked.length === 0) return;
    setTxtDrag(true);
    gStartPos = pos;
    document.body.style.cursor = 'grabbing';
    // renderCanvas();
}


function onMove(ev) {
    console.log('onMove()');
    const txt = getTxt();
    if (txt.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveTxt(dx, dy);
        gStartPos = pos;
        renderCanvas()
    }
}

function onUp() {
    console.log('onUp()');

    setTxtDrag(false)
    document.body.style.cursor = 'grab'

}

// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas')
//     gCanvas.width = elContainer.offsetWidth
//     gCanvas.height = elContainer.offsetHeight
// }

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    return pos
}