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
    // renderBox()
    renderCanvas()
}

// function renderBox() {
//     const { pos, color, size } = getTxtBox()
//     drawArc(pos.x, pos.y, size, color)
// }

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

// function drawArc(x, y, width, height) {
//     gCtx.beginPath()
//     gCtx.lineWidth = '20'
//     gCtx.arc(x, y, width, height)
//     gCtx.strokeStyle = 'blue'
//     gCtx.stroke()
//     gCtx.fillStyle = 'red'
//     gCtx.fill()
// }

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
    // if (font)
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


function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function onMove() {

}

function onDown() {

}

function onUp() {

}

// function onDown(ev) {
//     const pos = getEvPos(ev);
//     console.log('onDown()');

//     if (!isBoxClicked(pos)) return;
//     setBoxDrag(true);
//     gStartPos = pos;
//     document.body.style.cursor = 'grabbing';
//     // renderCanvas();
// }


// function onMove(ev) {
//     console.log('onMove()');
//     const txt = getTxtBox();
//     if (txt.isDrag) {
//         const pos = getEvPos(ev)
//         const dx = poss.x - gStartPos.x
//         const dy = po.y - gStartPos.y
//         moveBox(dx, dy);
//         gStartPos = pos;
//         renderCanvas()
//     }
// }

// function onUp() {
//     console.log('onUp()');

//     setBoxDrag(false)
//     document.body.style.cursor = 'grab'

// }

// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas')
//     gCanvas.width = elContainer.offsetWidth
//     gCanvas.height = elContainer.offsetHeight
// }

// function getEvPos(ev) {
//     var pos = {
//         x: ev.offsetX,
//         y: ev.offsetY
//     }
//     return pos
// }

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