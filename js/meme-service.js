'use strict';

var gTxtBox = [];

var gImgs = [
    { id: 1, url: "./img/imgs/1.jpg", keywords: ['baby', 'funny'] },
    { id: 2, url: "./img/imgs/2.jpg", keywords: ['person', 'unlucky', 'ironic'] },
    { id: 3, url: "./img/imgs/3.jpg", keywords: ['priorities', 'funny'] },
    { id: 4, url: "./img/imgs/4.jpg", keywords: ['priorities', 'funny'] },
    { id: 5, url: "./img/imgs/5.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 6, url: "./img/imgs/6.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 7, url: "./img/imgs/7.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 8, url: "./img/imgs/8.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 9, url: "./img/imgs/9.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 10, url: "./img/imgs/10.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 11, url: "./img/imgs/11.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 12, url: "./img/imgs/12.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 13, url: "./img/imgs/13.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 14, url: "./img/imgs/14.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 15, url: "./img/imgs/15.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 16, url: "./img/imgs/16.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 17, url: "./img/imgs/17.jpg", keywords: ['priorities', 'cat', 'funny'] },
    { id: 18, url: "./img/imgs/18.jpg", keywords: ['priorities', 'cat', 'funny'] },
];

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [{
            txt: '',
            size: 40,
            align: 'center',
            fillColor: 'black',
            strokeColor: 'black',
            font: 'Ariel',
            location: { x: 80, y: 50 },
        },
        {
            txt: '',
            size: 40,
            align: 'center',
            fillColor: 'black',
            strokeColor: 'black',
            font: 'Ariel',
            location: { x: 80, y: 200 },

        },
        {
            txt: '',
            size: 40,
            align: 'center',
            fillColor: 'black',
            strokeColor: 'black',
            font: 'Ariel',
            location: { x: 80, y: 350 },
        }
    ]
}

function getTxtBox(x, y) {
    var widthBox = gCanvas.width;
    return {
        x,
        y,
        height: widthBox / 5,
        width: widthBox - widthBox / 10,
        isDrag: false,
    };
}

function setLineTxt(memeTxt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = memeTxt;
}

function addTxtBox() {
    var lineIdx = gMeme.lines[gMeme.selectedLineIdx];
    var widthBox = gCanvas.width;

    if (lineIdx === 0) {
        gTxtBox.push(getTxtBox(widthBox / 20, widthBox / 20))
        return gTxtBox;
    }
    if (lineIdx === 1) {
        gTxtBox.push(getTxtBox(widthBox / 20, widthBox / 20))
        return gTxtBox;

    }
    if (lineIdx === 2) {
        gTxtBox.push(getTxtBox(widthBox / 20, widthBox / 20))
        return gTxtBox;
    }
    renderCanvas()
}



function clearLine() {
    if (gMeme.selectedLineIdx === 0)
        gMeme.lines[0].txt = '';
    if (gMeme.selectedLineIdx === 1)
        gMeme.lines[1].txt = '';
    if (gMeme.selectedLineIdx === 2)
        gMeme.lines[2].txt = '';

}


function getMeme() {
    return gMeme;
}

function getImgs() {
    return gImgs;

}

function onDownloadMeme(downLodeMeme) {
    downloadMeme(downLodeMeme);
}

function downloadMeme(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'memes';
}