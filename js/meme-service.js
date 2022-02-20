'use strict';


var gFilterBy = ''

var gImgs = [
    { id: 1, url: "./img/imgs/1.jpg", keywords: ['all', 'political', 'funny', 'person'] },
    { id: 2, url: "./img/imgs/2.jpg", keywords: ['all', 'animals'] },
    { id: 3, url: "./img/imgs/3.jpg", keywords: ['all', 'animals', 'funny'] },
    { id: 4, url: "./img/imgs/4.jpg", keywords: ['all', 'animals'] },
    { id: 5, url: "./img/imgs/5.jpg", keywords: ['all', 'baby', 'funny'] },
    { id: 6, url: "./img/imgs/6.jpg", keywords: ['all', 'person'] },
    { id: 7, url: "./img/imgs/7.jpg", keywords: ['all', 'baby', 'funny'] },
    { id: 8, url: "./img/imgs/8.jpg", keywords: ['all', 'person', 'funny'] },
    { id: 9, url: "./img/imgs/9.jpg", keywords: ['all', 'baby', 'funny'] },
    { id: 10, url: "./img/imgs/10.jpg", keywords: ['all', 'funny', 'person', 'political'] },
    { id: 11, url: "./img/imgs/11.jpg", keywords: ['all', 'person', 'funny', 'priorities'] },
    { id: 12, url: "./img/imgs/12.jpg", keywords: ['all', 'priorities', 'person'] },
    { id: 13, url: "./img/imgs/13.jpg", keywords: ['all', 'priorities', 'person'] },
    { id: 14, url: "./img/imgs/14.jpg", keywords: ['all', 'priorities', 'person'] },
    { id: 15, url: "./img/imgs/15.jpg", keywords: ['all', 'priorities', 'person'] },
    { id: 16, url: "./img/imgs/16.jpg", keywords: ['all', 'person', 'funny'] },
    { id: 17, url: "./img/imgs/17.jpg", keywords: ['all', 'person', 'funny', 'political'] },
    { id: 18, url: "./img/imgs/18.jpg", keywords: ['all', 'priorities', 'funny'] },
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
            isDrag: false
        },
        {
            txt: '',
            size: 40,
            align: 'center',
            fillColor: 'black',
            strokeColor: 'black',
            font: 'Ariel',
            location: { x: 80, y: 200 },
            isDrag: false
        },
        {
            txt: '',
            size: 40,
            align: 'center',
            fillColor: 'black',
            strokeColor: 'black',
            font: 'Ariel',
            location: { x: 80, y: 350 },
            isDrag: false
        }
    ]
}

function setFilterBy(txt) {
    gFilterBy = txt
}

function setLineTxt(memeTxt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = memeTxt;
}

function isTxtClicked(txtPos) {
    var res
    gMeme.lines.forEach((line, idx) => {
        const pos = line.location;
        var text = line.txt;
        const distance = gCtx.measureText(text);
        var distanceTxt = distance.width;
        var sizeTxt = line.size;
        if (txtPos.x <= (distanceTxt + pos.x) && txtPos.x >= pos.x && txtPos.y <= pos.y && txtPos.y >= (pos.y - (sizeTxt / 2))) {
            gMeme.selectedLineIdx = idx
            res = (txtPos.x <= (distanceTxt + pos.x) && txtPos.x >= pos.x && txtPos.y <= pos.y && txtPos.y >= (pos.y - (sizeTxt / 2)));
        }

    })
    return res;
}

function getMeme() {
    return gMeme;
}

function getImgs() {
    if (!gFilterBy) return gImgs;
    return gImgs.filter(img => {
        return img.keywords.includes(gFilterBy)
    })
}

function setBoxDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function moveTxtBox(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].location.x += dx
    gMeme.lines[gMeme.selectedLineIdx].location.y += dy
}



function clearLine() {
    if (gMeme.selectedLineIdx === 0)
        gMeme.lines[0].txt = '';
    if (gMeme.selectedLineIdx === 1)
        gMeme.lines[1].txt = '';
    if (gMeme.selectedLineIdx === 2)
        gMeme.lines[2].txt = '';

}


function downloadMeme(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'memes';
}


function uploadImg() {

    const imgDataUrl = gCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.btn-share').classList.remove('hide');
        document.querySelector('.btn-share').innerHTML = `
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
        share </a>`
    }

    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}