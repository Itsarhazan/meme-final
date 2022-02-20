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
}

function renderMeme(id) {
    gMeme.selectedImgId = id;
    renderCanvas()
}

function onFilter(txt) {
    setFilterBy(txt)
    renderGallery()
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

function onSwitchLine(pos) {
    pos = gMeme.selectedLineIdx
    if (pos === 0) {

        gMeme.lines[1].txt = gMeme.lines[0].txt;
        gMeme.lines[0].txt = '';
        gMeme.selectedLineIdx = 1;
    }
    if (pos === 1) {

        gMeme.lines[2].txt = gMeme.lines[1].txt;
        gMeme.lines[1].txt = '';
        gMeme.selectedLineIdx = 2;
    }
    if (pos === 2) {
        gMeme.lines[0].txt = gMeme.lines[2].txt;
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

function onChangeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font;
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

function onDownloadMeme(downLodeMeme) {
    downloadMeme(downLodeMeme);
}

function onFilter(word) {

    if (word === 'cat') {
        var elCat = document.querySelector('.cat')
        var size = parseInt(elCat.style.fontSize)
        console.log(elCat.style.fontSize);
        elCat.style.fontSize = (size++) + 'px';
        console.log(parseInt(elCat.style.fontSize));
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

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev);
    console.log('onDown()');

    if (!isTxtClicked(pos)) return;
    setBoxDrag(true);
    gStartPos = pos;
    document.body.style.cursor = 'grabbing';
    renderCanvas();
}

function onMove(ev) {
    console.log('onMove()');
    const txt = getTxtBox();
    if (txt.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveTxtBox(dx, dy);
        gStartPos = pos;
        renderCanvas()
    }
}

function onUp() {
    console.log('onUp()');

    setBoxDrag(false)
    document.body.style.cursor = 'grab'

}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach((el) => {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)
        if (el.nodeName === 'INPUT') {
            el.placeholder = txt
        } else el.innerText = txt
    })
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');
    doTrans();
}