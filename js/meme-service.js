'use strict';


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
            size: 50,
            align: 'center',
            fillColor: 'black',
            strokeColor: 'black',
            font: 'Ariel',
            location: { x: 80, y: 50 }
        },
        {
            txt: '',
            size: 30,
            align: 'center',
            fillColor: 'black',
            strokeColor: 'black',
            font: 'Ariel',
            location: { x: 80, y: 200 }
        },
        {
            txt: '',
            size: 30,
            align: 'center',
            fillColor: 'black',
            strokeColor: 'black',
            font: 'Ariel',
            location: { x: 80, y: 350 }
        }
    ]
}


function setLineTxt(memeTxt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = memeTxt;
}

function clearLine() {
    gMeme.lines[0].txt = '';
    gMeme.lines[1].txt = '';
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