'use strict';

var gCanvas;
var gCtx;
var gInputTxt;
var gPageEditor = document.querySelector('.meme-editor')
var gElImgs = document.querySelector('.meme-gallery')


function init() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    renderGallery();
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
    setLineTxt(txt)
    renderCanvas()
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
    console.log('hii');
    if (gMeme.selectedLineIdx === 0) {
        gMeme.lines[2].txt = gMeme.lines[gMeme.selectedLineIdx].txt;
        gMeme.lines[0].txt = '';
    }
    if (gMeme.selectedLineIdx === 2) {
        gMeme.lines[0].txt = gMeme.lines[gMeme.selectedLineIdx].txt;
        gMeme.lines[2].txt = '';
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

    if (word === 'cat')
        document.querySelector('.cat').style.size = '50' + 'px'
    if (word === 'funny') funny++
        if (word === 'priorities') priorities++
            if (word === 'ironic') ironic++

}